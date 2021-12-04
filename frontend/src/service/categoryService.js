import http from "./httpService";

const apiEndpoint = "/api/category";

function getAll() {
  return http.get(apiEndpoint + "/get");
}
function getAllName() {
  return http.get(apiEndpoint + "/getName");
}

export default { getAll,getAllName };