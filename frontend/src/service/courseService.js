import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/course";

function findUsers(courseId,UserEmail) {
    return http.get(apiEndpoint + `/${courseId}/findUsers?keyword=${UserEmail}`);
  }


export default {
    findUsers
};
