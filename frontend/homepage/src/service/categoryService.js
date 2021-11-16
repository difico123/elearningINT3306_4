import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/category";

function getAll() {
    return http.get(apiEndpoint + "/get");
}

export default {
    getAll
}