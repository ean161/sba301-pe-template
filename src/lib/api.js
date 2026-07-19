import axios from "axios";
import { config } from "./config.jsx";

export const api = axios.create({
    baseURL: `${config.SERVER_URL}/api`,
    headers: {
        "Content-Type": "application/json",
        Fetcher: "ean-sba301",
    },
});
