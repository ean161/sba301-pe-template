import { api } from "../lib/api.js";
import { config } from "../lib/config.jsx";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

export default function List() {
    const [list, setList] = useState([]);

    const fetchList = async () => {
        const req = await api.get(config.LIST.rest);
        setList(req.data[config.LIST.param]);
    };

    useEffect(() => {
        fetchList();
    }, []);

    return (
        <>
            <h1>LIST PAGE</h1>
            {(!list || list.length === 0) && <p>{config.LIST.nullTableText}</p>}
            {list && (
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
            )}
        </>
    );
}
