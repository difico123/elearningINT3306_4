import http from "./httpService";
import {apiUrl} from '../config.json'

const apiEndpoint = apiUrl + "/api/notification";

function getNotSeenNotifications() {
  return http.get(apiEndpoint + "/getNotSeenMsgs");
}

function getNotifications() {
  return http.get(apiEndpoint + "/get");
}

function delNotification(notificationId) {
  return http.delete(apiEndpoint + `/delete/${notificationId}`);
}

function setConfirm(notificationId) {
  return http.put(apiEndpoint + `/setConfirm/${notificationId}`);
}

export default { getNotSeenNotifications, getNotifications, delNotification, setConfirm };