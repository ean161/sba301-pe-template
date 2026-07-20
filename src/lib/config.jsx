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
        search: {
            isEnabled: true,
            label: "Search by name",
        },
        table: {
            ID: (row) => row.id,
            "RECIPE NAME": (row) => (
                <Link to={`/recipes/${row.id}`}>{row.name}</Link>
            ),
            ACTIONS: (row, handleDeleteBtn) => {
                if (config.DELETE.isModal) {
                    return (
                        <Button
                            variant={"outline-danger"}
                            onClick={() => handleDeleteBtn(row.id)}
                        >
                            Delete
                        </Button>
                    );
                } else {
                    return (
                        <Button
                            variant={"outline-danger"}
                            href={`${config.DELETE.page.replace(":id", row.id)}`}
                        >
                            Delete
                        </Button>
                    );
                }
            },
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
		successAlert: "Recipe created successfully",
		errorAlert: "Failed on create",
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
                label: "Prep time",
                key: "prepTime",
                placeHolder: "Enter a prep time",
                type: "input",
                validate: {
                    type: "number",
                    min: 3,
                    max: 5,
                },
            },
            {
                label: "Cook time",
                key: "cookTime",
                placeHolder: "Enter a cook time",
                type: "input",
                validate: {
                    type: "number",
                    min: 3,
                    max: 5,
                },
            },
            {
                label: "Difficulty",
                key: "difficulty",
                placeHolder: "Select a difficulty",
                type: "select",
                options: {
                    easy: "Easy",
                    medium: "Medium",
                    hard: "Hard",
                },
            },
            {
                label: "Servings",
                key: "servings",
                placeHolder: "Enter servings",
                type: "input",
                validate: {
                    type: "number",
                    min: 3,
                    max: 5,
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
    DELETE: {
        isModal: false,
        title: "DELETE RECIPE",
        page: "/recipes/delete/:id",
        rest: "/v1/recipes/:id",
        param: "name",
        text: "Do u wanna delete :param?",
        successAlert: "Deleted :param successfully",
        list: {
            ID: (row) => row.id,
            "RECIPE NAME": (row) => row.name,
        },
    },
};
