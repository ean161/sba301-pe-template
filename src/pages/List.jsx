import { api } from "../lib/api.js";
import { config } from "../lib/config.jsx";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

export default function List() {
    const [list, setList] = useState([]);

    const fetchList = async () => {
        const req = await api.get(config.LIST.url);
        setList(req.data[config.LIST.param]);
    };

    useEffect(() => {
        fetchList();
    }, []);

    return (
        <>
            <h1>LIST PAGE</h1>
            <Table>
                <thead>
                    {Object.keys(config.LIST.table).map((col, idx) => (
                        <th>{col}</th>
                    ))}
                </thead>
                <tbody>
                    {list.map((row, idx) => (
                        <tr key={idx}>
                            {Object.values(config.LIST.table).map(
                                (col, idx) => (
                                    <td>{col(row)}</td>
                                ),
                            )}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}
