import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = "/api/course";

function findUsers(courseId, UserEmail) {
  return http.get(apiEndpoint + `/${courseId}/findUsers?keyword=${UserEmail}`);
}

function getAll(categoryId, keyword, page, rating) {
  let query;
  keyword = !keyword ? "" : `keyword=${keyword}`;
  page = !page ? "" : `&page=${page}`;
  rating = !rating ? "" : `&rating=${rating}`;
  categoryId = !categoryId ? "" : `&categoryId=${categoryId}`;
  query =
    !keyword && !page && !rating && !categoryId
      ? ""
      : `?${keyword}${page}${rating}${categoryId}`;
  return http.get(apiEndpoint + `/showAll${query}`);
}

export default { findUsers, getAll };