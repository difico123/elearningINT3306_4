import http from "./httpService";

const apiEndpoint = "/api/course";

function findUsers(courseId,UserEmail) {
    return http.get(apiEndpoint + `/${courseId}/findUsers?keyword=${UserEmail}`);
  }


export default {
    findUsers
};
