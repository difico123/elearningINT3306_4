import http from "./httpService";

const apiEndpoint = "/api/user";

function getUserInfo() {
  const config = { headers: { 'Content-Type': 'application/json' } };
  return http.get( apiEndpoint + '/info', config);
}

function editUser(user) {
  const config = { headers: { 'Content-Type': 'application/json' } };
  return http.put( apiEndpoint + '/editInfo',user, config);
}

export default {
    getUserInfo,
    editUser
};
