import http from "./httpService";
import {apiUrl} from '../config.json'

const apiEndpoint = apiUrl + "/api/user";

async function getUserInfo() {
  const config = { headers: { 'Content-Type': 'application/json' } };
  return await http.get( apiEndpoint + '/info', config);
}
function getCurrentUser() {
  return localStorage.getItem('uuid');
}

async function editUser(user) {
  const config = { headers: { "Content-Type": "multipart/form-data"  } };
  return await http.put( apiEndpoint + '/editInfo',user, config);
}

function editPw(user) {
  const config = { headers: { 'Content-Type': 'application/json' } };
  return http.put( apiEndpoint + '/editPw',user, config);
}

function profile(user) {
  const config = { headers: { 'Content-Type': 'application/json' } };
  return http.get( apiEndpoint + '/profile',user, config);
}

export default {
    getUserInfo,
    editUser,
    editPw,
    profile,
    getCurrentUser
};
