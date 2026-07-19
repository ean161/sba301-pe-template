import {Badge, Button} from "react-bootstrap";

export const config = {
    SERVER_URL: "http://localhost:8080",
    LIST: {
        url: "/v1/recipes",
        param: "content",
        table: {
			"COL": (row) => 0,
			"RECEIPE NAME": (row) => row.name,
			"PREP": (row) => row.prepTime + "m",
			"COOK": (row) => row.cookTime + "m",
			"TOTAL": (row) => (row.prepTime + row.cookTime) + "m",
			"DIFFICULTY": (row) => {
				const diff = row.difficulty.toLowerCase();
				if (diff === "easy")
					return <Badge bg={"success"}>EASY</Badge>
				else if (diff === "medium")
					return <Badge bg={"warning"}>MEDIUM</Badge>
				else if (diff === "hard")
					return <Badge bg={"danger"}>HARD</Badge>
			},
			"SERVINGS": (row) => row.servings,
			"ACTIONS": (row) => <Button variant={"outline-danger"}>Delete</Button>
		}
    },
};
