import { Button } from "react-bootstrap";

export const config = {
    SERVER_URL: "http://localhost:8080",
    LIST: {
        title: "LIST",
        page: "/",
        rest: "/v1/CONFIG_SAMPLE",
        param: "content",
        nullTableText: "No records found",
        pageSize: 5,
        search: {
            isEnabled: true,
            label: "Search by name",
        },
        table: {
            ID: (row) => row.id,
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
        title: "DETAILS",
        page: "/CONFIG_SAMPLE/:id",
        rest: "/v1/CONFIG_SAMPLE/:id",
        list: {
            ID: (row) => row.id,
        },
    },
    ADD: {
        btnTitle: "Add",
        title: "ADD",
        page: "/CONFIG_SAMPLE/add",
        rest: "/v1/CONFIG_SAMPLE",
		successAlert: "Created successfully",
		errorAlert: "Failed on create",
        form: [
            {
				label: "CONFIG_SAMPLE",
                key: "CONFIG_SAMPLE",
                placeHolder: "Enter a CONFIG_SAMPLE",
                type: "input", // input | select | fetch-select
                validate: {
                    type: "text", // text | number
                    min: 3,
                    max: 5,
                },
				options: {
					// [key: val]
					// url: "/v1/CONFIG_SAMPLE",
					// param: "CONFIG_SAMPLE",
				},
            },
        ],
    },
    DELETE: {
        isModal: false,
        title: "DELETE",
        page: "/CONFIG_SAMPLE/delete/:id",
        rest: "/v1/CONFIG_SAMPLE/:id",
        param: "CONFIG_SAMPLE",
        text: "Do u wanna delete :param?",
        successAlert: "Deleted :param successfully",
        list: {
            ID: (row) => row.id,
        },
    },
};
