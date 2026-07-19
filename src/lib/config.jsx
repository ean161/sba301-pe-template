import { Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const config = {
    SERVER_URL: "http://localhost:8080",
    LIST: {
        title: "RECIPES LIST",
        page: "/",
        rest: "/v1/recipes",
        param: "content",
        nullTableText: "No records found",
        pageSize: 5,
        table: {
            ID: (row) => row.id,
            "RECIPE NAME": (row) => (
                <Link to={`/recipes/${row.id}`}>{row.name}</Link>
            ),
            ACTIONS: (row) => (
                <Button variant={"outline-danger"}>Delete {row.id}</Button>
            ),
        },
    },
    DETAILS: {
        title: "RECIPE DETAILS",
        page: "/recipes/:id",
        rest: "/v1/recipes/:id",
        list: {
            ID: (row) => row.id,
            "RECIPE NAME": (row) => row.name,
            "Prep Time": (row) => row.prepTime + " mins",
        },
    },
    ADD: {
        btnTitle: "Add",
        title: "ADD RECIPE",
        page: "/recipes/add",
        rest: "/v1/recipes",
        form: [
            {
                label: "Name",
                key: "name",
                placeHolder: "Enter a name",
                type: "input",
                validate: {
                    type: "text",
                    min: 3,
                    max: 5,
                },
            },
            {
                label: "Age",
                key: "age",
                placeHolder: "Enter a age",
                type: "input",
                validate: {
                    type: "number",
                    min: 3,
                    max: 5,
                },
            },
            {
                label: "Role",
                key: "role",
                placeHolder: "Select a role",
                type: "select",
                options: {
                    AID: "ADMIN",
                    SID: "STAFF",
                },
            },
            {
                label: "Meal type",
                key: "mealTypeId",
                placeHolder: "Select a meal type",
                type: "fetch-select",
                options: {
                    url: "/v1/meal-types",
                    param: "name",
                },
            },
        ],
    },
};
