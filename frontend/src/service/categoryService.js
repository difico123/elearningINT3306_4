import http from "./httpService";
import {apiUrl} from '../config.json'

const apiEndpoint = apiUrl+ "/api/category";
function getAll() {
  return http.get(apiEndpoint + "/get");
}
function getAllName() {
  return http.get(apiEndpoint + "/getName");
}

export default { getAll,getAllName };