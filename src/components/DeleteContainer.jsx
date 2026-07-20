import { Button, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { api } from "../lib/api.js";
import { config } from "../lib/config.jsx";
import { useNavigate } from "react-router-dom";

export default function DeleteContainer({
    id,
    toggleModal = null,
    fetchList = null,
}) {
    const navigator = useNavigate();

    const isModalMode = config.DELETE.isModal;
    const param = config.DELETE.param;
    const [details, setDetails] = useState();

    const fetchDetails = async () => {
        if (!id) {
            return;
        }

        try {
            const req = await api.get(
                `${config.DELETE.rest.replace(":id", id)}`,
            );
            setDetails(req.data);
        } catch (e) {
            navigator("/");
        }
    };

    const handleDelete = async () => {
        if (!id) {
            return;
        }

        try {
            const req = await api.delete(
                `${config.DELETE.rest.replace(":id", id)}`,
            );

            alert(config.DELETE.successAlert.replace(":param", details[param]));

            if (isModalMode) {
                toggleModal(false);
                fetchList();
            } else {
                navigator("/");
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchDetails();
    }, [id]);

    if (!details) {
        return <></>;
    }

    return (
        <>
            <p>{config.DELETE.text.replace(":param", details[param])}</p>
            {Object.entries(config.DELETE.list).map(([key, func]) => (
                <p key={key}>
                    {key}: {func(details)}
                </p>
            ))}

            <Button
                variant={"danger"}
                className={"me-2"}
                onClick={handleDelete}
            >
                Confirm delete
            </Button>
            {!isModalMode ? (
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
