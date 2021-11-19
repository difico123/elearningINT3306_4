import http from "./httpService";

const apiEndpoint = "/category";

function getAll() {
  return http.get(apiEndpoint + "/get");
}

export default {
  getAll,
};
