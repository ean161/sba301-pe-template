import { config } from "../lib/config.jsx";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useEffect, useState } from "react";
import { api } from "../lib/api.js";

export default function Add() {
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});

    const [fetchField, setFetchField] = useState({});
    const fetchSelectField = async () => {
        const fetchFieldList = config.ADD.form.filter(
            (item) => item.type === "fetch-select",
        );

        if (!fetchFieldList || fetchFieldList.length === 0) {
            return;
        }

        const req = await api.get(`${fetchFieldList[0].options.url}`);
        setFetchField(req.data);
    };

    const validate = () => {
        const err = {};

        config.ADD.form.map((item) => {
            const val = form[item.key];

            if (!val) {
                err[item.key] = `${item.label} must be required`;
                return;
            }

            if (item.validate) {
                if (item.validate.type === "text") {
                    const strlen = val.length;
                    if (strlen < item.validate.min) {
                        err[item.key] =
                            `${item.label} length must be greater or equals than ${item.validate.min} chars`;
                        return;
                    } else if (strlen > item.validate.max) {
                        err[item.key] =
                            `${item.label} length must be less or equals than ${item.validate.max} chars`;
                        return;
                    }
                }

                if (item.validate.type === "number") {
                    if (!isFinite(val)) {
                        err[item.key] = `${item.label} must be a number`;
                        return;
                    }

                    const valNum = parseInt(val);
                    if (valNum < item.validate.min) {
                        err[item.key] =
                            `${item.label} must be greater or equals than ${item.validate.min}`;
                        return;
                    } else if (valNum > item.validate.max) {
                        err[item.key] =
                            `${item.label} must be less or equals than ${item.validate.max}`;
                        return;
                    }
                }
            }
        });

        setErrors(err);
        return Object.keys(err).length === 0;
    };

    const updateField = (event) => {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: value }));
        setErrors((current) => ({ ...current, [name]: undefined }));
    };

    useEffect(() => {
        fetchSelectField();
    }, []);

    console.log(form, errors);

    return (
        <>
            <h1>{config.ADD.title}</h1>
            <Form noValidate>
                {config.ADD.form.map((item) => (
                    <Form.Group
                        key={item.key}
                        className={"d-flex align-items-center gap-3 mb-3"}
                    >
                        <Form.Label className={"w-25 text-end"}>
                            {item.label}
                        </Form.Label>
                        <div className={"w-50"}>
                            {item.type === "input" && (
                                <Form.Control
                                    name={item.key}
                                    value={form[item.key]}
                                    onChange={updateField}
                                    placeholder={item.placeHolder}
                                    isInvalid={Boolean(errors[item.key])}
                                />
                            )}
                            {item.type === "select" && (
                                <Form.Select
                                    name={item.key}
                                    value={form[item.key]}
                                    onChange={updateField}
                                    isInvalid={Boolean(errors[item.key])}
                                >
                                    <option value="">{item.placeHolder}</option>
                                    {Object.entries(item.options).map(
                                        ([oId, label]) => (
                                            <option key={oId} value={oId}>
                                                {label}
                                            </option>
                                        ),
                                    )}
                                </Form.Select>
                            )}
                            {item.type === "fetch-select" && (
                                <Form.Select
                                    name={item.key}
                                    value={form[item.key]}
                                    onChange={updateField}
                                    isInvalid={Boolean(errors[item.key])}
                                >
                                    <option value="">{item.placeHolder}</option>
                                    {fetchField &&
                                        "map" in fetchField &&
                                        fetchField.map((row) => (
                                            <option key={row.id} value={row.id}>
                                                {row[item.options.param]}
                                            </option>
                                        ))}
                                </Form.Select>
                            )}
                            <Form.Control.Feedback
                                className={"text-end"}
                                type="invalid"
                            >
                                {errors[item.key]}
                            </Form.Control.Feedback>
                        </div>
                    </Form.Group>
                ))}
                <Form.Group>
					<Button className={"me-2"} variant={"secondary"} href={"/"}>Back</Button>
                    <Button onClick={validate}>Submit</Button>
                </Form.Group>
            </Form>
        </>
    );
}
