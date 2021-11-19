import http from "./httpService";

const apiEndpoint = "/api/user";

function getUserInfo() {
  const config = { headers: { 'Content-Type': 'application/json' } };
  return http.get( apiEndpoint + '/info', config);
}

export default {
    getUserInfo
};
