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

    const [pagination, setPagination] = useState({
        totalElements: 0,
        totalPages: 0,
        first: true,
        last: true,
    });

    const fetchList = async () => {
        const req = await api.get(config.LIST.rest, {
            params: { page, size: config.LIST.pageSize, search },
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

    const handleSearch = () => {
        fetchList();
    };

    useEffect(() => {
        fetchList();
    }, [page]);

    const handleDeleteBtn = (id) => {
        setDeleteSelected(id);
        setDeleteModalOpen(true);
    };

    useEffect(() => {
        if (search === "") {
            fetchList();
        }
    }, [search]);

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
            {config.LIST.search.isEnabled && (
                <Container className={"mb-4"}>
                    <Form>
                        <Form.Group
                            className={
                                "d-flex align-items-center items-center justify-content-center gap-3 mb-3"
                            }
                        >
                            <Form.Label className={"w-fit"}>
                                {config.LIST.search.label}
                            </Form.Label>
                            <Form.Control
                                name={config.LIST.search.key}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className={"w-25"}
                            />
                            <Button
                                onClick={handleSearch}
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
