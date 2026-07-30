import { api } from "../lib/api.js";
import { config } from "../lib/config.jsx";
import { useEffect, useState } from "react";
import {
    Button,
    Container,
    Form,
    Modal,
    Pagination,
    Table,
} from "react-bootstrap";
import DeleteContainer from "../components/DeleteContainer.jsx";

export default function List() {
    const [deleteSelected, setDeleteSelected] = useState(0);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

    const [list, setList] = useState([]);
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState("");
    const [submittedSearch, setSubmittedSearch] = useState("");
    const [filterSelection, setFilterSelection] = useState("");
    const [submittedFilterSelection, setSubmittedFilterSelection] =
        useState("");
    const [fetchFilterSelection, setFetchFilterSelection] = useState([]);

    const [pagination, setPagination] = useState({
        totalElements: 0,
        totalPages: 0,
        first: true,
        last: true,
    });

    const fetchList = async (
        searchValue = submittedSearch,
        filterSelectionValue = submittedFilterSelection,
    ) => {
        const params = {
            page,
            size: config.LIST.pageSize,
        };

        if (config.LIST.search.isEnabled) {
            params[config.LIST.search.key] = searchValue;
        }

        if (config.LIST.filterSelection.isEnabled && filterSelectionValue) {
            params[config.LIST.filterSelection.key] = filterSelectionValue;
        }

        const req = await api.get(config.LIST.rest, {
            params,
        });
        const data = req.data;

        setList(data[config.LIST.param] ?? []);
        setPagination({
            totalElements: data.totalElements ?? 0,
            totalPages: data.totalPages ?? 0,
            first: data.first ?? data.page === 0,
            last: data.last ?? data.page >= data.totalPages - 1,
        });
    };

    const handleSearch = (event) => {
        event.preventDefault();
        setSubmittedSearch(search);
        setSubmittedFilterSelection(filterSelection);

        if (page === 0) {
            fetchList(search, filterSelection);
        } else {
            setPage(0);
        }
    };

    const handleFilterSelectionChange = (event) => {
        setFilterSelection(event.target.value);
    };

    useEffect(() => {
        const loadList = async () => {
            const params = {
                page,
                size: config.LIST.pageSize,
            };

            if (config.LIST.search.isEnabled) {
                params[config.LIST.search.key] = submittedSearch;
            }

            if (
                config.LIST.filterSelection.isEnabled &&
                submittedFilterSelection
            ) {
                params[config.LIST.filterSelection.key] =
                    submittedFilterSelection;
            }

            const req = await api.get(config.LIST.rest, {
                params,
            });
            const data = req.data;

            setList(data[config.LIST.param] ?? []);
            setPagination({
                totalElements: data.totalElements ?? 0,
                totalPages: data.totalPages ?? 0,
                first: data.first ?? data.page === 0,
                last: data.last ?? data.page >= data.totalPages - 1,
            });
        };

        loadList();
        // Search and filter are intentionally submitted by the Search button.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    useEffect(() => {
        const loadFilterSelectionField = async () => {
            const filterConfig = config.LIST.filterSelection;

            if (
                !filterConfig.isEnabled ||
                filterConfig.type !== "fetch-select"
            ) {
                return;
            }

            const req = await api.get(`${filterConfig.options.url}`);
            setFetchFilterSelection(req.data);
        };

        loadFilterSelectionField();
    }, []);

    const handleDeleteBtn = (id) => {
        setDeleteSelected(id);
        setDeleteModalOpen(true);
    };

    return (
        <>
            <h1>{config.LIST.title}</h1>
            <Button
                href={config.ADD.page}
                variant={"success"}
                className={"mb-4"}
            >
                {config.ADD.btnTitle}
            </Button>
            {(config.LIST.search.isEnabled ||
                config.LIST.filterSelection.isEnabled) && (
                <Container className={"mb-4"}>
                    <Form onSubmit={handleSearch}>
                        <Form.Group
                            className={
                                "d-flex align-items-center items-center justify-content-center gap-3 mb-3"
                            }
                        >
                            {config.LIST.search.isEnabled && (
                                <>
                                    <Form.Label className={"w-fit"}>
                                        {config.LIST.search.label}
                                    </Form.Label>
                                    <Form.Control
                                        name={config.LIST.search.key}
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                        className={"w-25"}
                                    />
                                </>
                            )}
                            {config.LIST.filterSelection.isEnabled && (
                                <>
                                    <Form.Label className={"w-fit"}>
                                        {config.LIST.filterSelection.label}
                                    </Form.Label>
                                    {config.LIST.filterSelection.type ===
                                        "select" && (
                                        <Form.Select
                                            value={filterSelection}
                                            onChange={
                                                handleFilterSelectionChange
                                            }
                                            className={"w-25"}
                                        >
                                            <option value="">All</option>
                                            {Object.entries(
                                                config.LIST.filterSelection
                                                    .options,
                                            ).map(([oId, label]) => (
                                                <option key={oId} value={oId}>
                                                    {label}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    )}
                                    {config.LIST.filterSelection.type ===
                                        "fetch-select" && (
                                        <Form.Select
                                            value={filterSelection}
                                            onChange={
                                                handleFilterSelectionChange
                                            }
                                            className={"w-25"}
                                        >
                                            <option value="">All</option>
                                            {fetchFilterSelection &&
                                                "map" in fetchFilterSelection &&
                                                fetchFilterSelection.map(
                                                    (row) => (
                                                        <option
                                                            key={row.id}
                                                            value={row.param}
                                                        >
                                                            {
                                                                row[
                                                                    config.LIST
                                                                        .filterSelection
                                                                        .options
                                                                        .param
                                                                ]
                                                            }
                                                        </option>
                                                    ),
                                                )}
                                        </Form.Select>
                                    )}
                                </>
                            )}
                            <Button
                                type={"submit"}
                                variant={"outline-secondary"}
                            >
                                Search
                            </Button>
                        </Form.Group>
                    </Form>
                </Container>
            )}
            {(!list || list.length === 0) && <p>{config.LIST.nullTableText}</p>}
            {list.length > 0 && (
                <Table>
                    <thead>
                        <tr>
                            {Object.keys(config.LIST.table).map((col) => (
                                <th key={col}>{col}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((row, idx) => (
                            <tr key={row.id ?? idx}>
                                {Object.values(config.LIST.table).map(
                                    (col, idx) => (
                                        <td key={idx}>
                                            {col(row, handleDeleteBtn)}
                                        </td>
                                    ),
                                )}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
            {pagination.totalPages > 0 && (
                <>
                    <p>Total elements: {pagination.totalElements}</p>
                    <Pagination>
                        <Pagination.Prev
                            disabled={pagination.first}
                            onClick={() => setPage((current) => current - 1)}
                        />
                        {Array.from(
                            { length: pagination.totalPages },
                            (_, index) => (
                                <Pagination.Item
                                    key={index}
                                    active={index === page}
                                    onClick={() => setPage(index)}
                                >
                                    {index + 1}
                                </Pagination.Item>
                            ),
                        )}
                        <Pagination.Next
                            disabled={pagination.last}
                            onClick={() => setPage((current) => current + 1)}
                        />
                    </Pagination>
                </>
            )}

            <Modal show={isDeleteModalOpen} onHide={setDeleteModalOpen}>
                <Modal.Header closeButton>
                    <Modal.Title>{config.DELETE.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DeleteContainer
                        id={deleteSelected}
                        toggleModal={setDeleteModalOpen}
                        fetchList={fetchList}
                    />
                </Modal.Body>
            </Modal>
        </>
    );
}
