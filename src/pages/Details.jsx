import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../lib/api.js";
import { config } from "../lib/config.jsx";
import {Button, Container} from "react-bootstrap";

export default function Details() {
    const { id } = useParams();

    const [details, setDetails] = useState();

    const fetchDetails = async () => {
        const req = await api.get(`${config.DETAILS.rest.replace(":id", id)}`);
		setDetails(req.data)
    };

    useEffect(() => {
        fetchDetails();
    }, []);

	if (!details) {
		return <></>
	}

    return (
        <>
            <h1>Details</h1>
			<Container>
				{Object.entries(config.DETAILS.list).map(([key, func]) => (
					<p key={key}>{key}: {func(details)}</p>
				))}

				<Button variant={"secondary"} href={"/"}>Back</Button>
			</Container>
        </>
    );
}
