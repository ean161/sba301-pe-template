import { Button } from "react-bootstrap";

export const formatDate = (value, format = "d/m/YYYY") => {
    if (!value) {
        return "";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "";
    }

    const pad = (number) => String(number).padStart(2, "0");
    const tokens = {
        YYYY: date.getFullYear(),
        d: pad(date.getDate()),
        m: pad(date.getMonth() + 1),
        H: pad(date.getHours()),
        i: pad(date.getMinutes()),
        s: pad(date.getSeconds()),
    };

    return format.replace(/YYYY|d|m|H|i|s/g, (token) => tokens[token]);
};

export const config = {
    formatDate,
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
            key: "CONFIG_SAMPLE",
            label: "Search by name",
        },
        filterSelection: {
            isEnabled: true,
            key: "CONFIG_SAMPLE",
            label: "Select a CONFIG_SAMPLE to filter",
            type: "select", // select | fetch-select
            options: {
                CONFIG_SAMPLE_ID: "CONFIG_SAMPLE",
            },
            // fetch-select config ver
            // {
            //     options: {
            //         url: "/v1/CONFIG_SAMPLE",
            //         param: "CONFIG_SAMPLE",
            //     },
            // },
        },
        table: {
            ID: (row) => row.id,
            // "CONFIG_SAMPLE Date": (row) =>
            //     config.formatDate(row.CONFIG_SAMPLE, "H:i:s d/m/YYYY"),
            ACTIONS: (row, handleDeleteBtn) => {
                if (config.DELETE.isModal) {
                    return (
                        <>
                            <Button
                                href={`${config.UPDATE.page.replace(":id", row.id)}`}
                                className="me-2"
                                variant={"outline-primary"}
                            >
                                Edit
                            </Button>
                            <Button
                                variant={"outline-danger"}
                                onClick={() => handleDeleteBtn(row.id)}
                            >
                                Delete
                            </Button>
                        </>
                    );
                } else {
                    return (
                        <>
                            <Button
                                href={`${config.UPDATE.page.replace(":id", row.id)}`}
                                className="me-2"
                                variant={"outline-primary"}
                            >
                                Edit
                            </Button>
                            <Button
                                variant={"outline-danger"}
                                href={`${config.DELETE.page.replace(":id", row.id)}`}
                            >
                                Delete
                            </Button>
                        </>
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
                type: "input", // input | date | datetime | select | fetch-select
                validate: {
                    type: "text", // text | number | date | datetime
                    min: 3,
                    max: 5,
                },
                options: {
                    // [key: val]
                    // url: "/v1/CONFIG_SAMPLE",
                    // param: "CONFIG_SAMPLE",
                },
            },
            // {
            //     label: "CONFIG_SAMPLE Date",
            //     key: "CONFIG_SAMPLE",
            //     placeHolder: "Select a CONFIG_SAMPLE date",
            //     type: "date", // input | date | datetime | select | fetch-select
            //     validate: {
            //         type: "date", // text | number | date | datetime
            //     },
            // },
            // {
            //     label: "CONFIG_SAMPLE Datetime",
            //     key: "CONFIG_SAMPLE",
            //     placeHolder: "Select a CONFIG_SAMPLE datetime",
            //     type: "datetime", // input | date | datetime | select | fetch-select
            //     validate: {
            //         type: "datetime", // text | number | date | datetime
            //     },
            // },
        ],
    },
    UPDATE: {
        title: "UPDATE",
        page: "/CONFIG_SAMPLE/update/:id",
        rest: "/v1/CONFIG_SAMPLE/:id",
        detailsRest: "/v1/CONFIG_SAMPLE/:id",
        successAlert: "Updated successfully",
        errorAlert: "Failed on update",
        form: [
            {
                label: "CONFIG_SAMPLE",
                key: "CONFIG_SAMPLE",
                placeHolder: "Enter a CONFIG_SAMPLE",
                type: "input", // input | date | datetime | select | fetch-select
                validate: {
                    type: "text", // text | number | date | datetime
                    min: 3,
                    max: 5,
                },
            },
            // {
            //     label: "CONFIG_SAMPLE Date",
            //     key: "CONFIG_SAMPLE",
            //     placeHolder: "Select a CONFIG_SAMPLE date",
            //     type: "date", // input | date | datetime | select | fetch-select
            //     validate: {
            //         type: "date", // text | number | date | datetime
            //     },
            // },
            // {
            //     label: "CONFIG_SAMPLE Datetime",
            //     key: "CONFIG_SAMPLE",
            //     placeHolder: "Select a CONFIG_SAMPLE datetime",
            //     type: "datetime", // input | date | datetime | select | fetch-select
            //     validate: {
            //         type: "datetime", // text | number | date | datetime
            //     },
            // },
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
