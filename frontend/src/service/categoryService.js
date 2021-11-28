import http from "./httpService";

const apiEndpoint = "/api/category";

function getAll() {
  return http.get(apiEndpoint + "/get");
}

export default { getAll };