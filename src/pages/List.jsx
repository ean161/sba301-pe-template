import { api } from "../lib/api.js";
import { config } from "../lib/config.jsx";
import { useEffect, useState } from "react";
import { Button, Modal, Pagination, Table } from "react-bootstrap";
import DeleteContainer from "../components/DeleteContainer.jsx";

export default function List() {
    const [deleteSelected, setDeleteSelected] = useState(0);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

    const [list, setList] = useState([]);
    const [page, setPage] = useState(0);
    const [pagination, setPagination] = useState({
        totalElements: 0,
        totalPages: 0,
        first: true,
        last: true,
    });

    const fetchList = async () => {
        const req = await api.get(config.LIST.rest, {
            params: { page, size: config.LIST.pageSize },
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

    useEffect(() => {
        fetchList();
    }, [page]);

    const handleDeleteBtn = (id) => {
        setDeleteSelected(id);
        setDeleteModalOpen(true);
    };

    return (
        <>
            <h1>{config.LIST.title}</h1>
            <Button href={config.ADD.page}>{config.ADD.btnTitle}</Button>
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
