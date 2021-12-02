import http from "./httpService";

const apiEndpoint = "/api/notification";

function getNotSeenNotifications() {
  return http.get(apiEndpoint + "/getNotSeenMsgs");
}
function getNotifications() {
  return http.get(apiEndpoint + "/get");
}

export default { getNotSeenNotifications, getNotifications };