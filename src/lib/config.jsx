import {Badge, Button} from "react-bootstrap";
import {Link} from "react-router-dom";

export const config = {
    SERVER_URL: "http://localhost:8080",
    LIST: {
		page: "/",
        rest: "/v1/recipes",
        param: "content",
		nullTableText: "No records found",
        table: {
			"ID": (row) => row.id,
			"RECEIPE NAME": (row) => <Link to={`/recipes/${row.id}`}>{row.name}</Link> ,
			"ACTIONS": (row) => <Button variant={"outline-danger"}>Delete</Button>
		}
    },
	DETAILS: {
		page: "/recipes/:id",
		rest: "/v1/recipes/:id",
		list: {
			"ID": (row) => row.id,
			"RECEIPE NAME": (row) => row.name,
		}
	}
};
