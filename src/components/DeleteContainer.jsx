import { Button, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { api } from "../lib/api.js";
import { config } from "../lib/config.jsx";

export default function DeleteContainer({ id, toggleModal = null }) {
    const [details, setDetails] = useState();

    const fetchDetails = async () => {
        if (!id) {
            return;
        }

        const req = await api.get(`${config.DELETE.rest.replace(":id", id)}`);
        setDetails(req.data);
    };

    useEffect(() => {
        fetchDetails();
    }, [id]);

    if (!details) {
        return <></>;
    }

    return (
        <>
            {Object.entries(config.DELETE.list).map(([key, func]) => (
                <p key={key}>
                    {key}: {func(details)}
                </p>
            ))}

            <Button variant={"danger"} className={"me-2"}>
                Confirm delete
            </Button>
            {!config.DELETE.isModal ? (
                <Button variant={"secondary"} href={"/"}>
                    Back
                </Button>
            ) : (
                <Button
                    variant={"secondary"}
                    onClick={() => toggleModal(false)}
                >
                    Cancel
                </Button>
            )}
        </>
    );
}
