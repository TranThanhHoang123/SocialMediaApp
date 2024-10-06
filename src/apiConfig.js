// /src/apiConfig.js
import axios from "axios";
const BASE_URL = 'http://127.0.0.1:8000';
const API_ENDPOINTS = {
  LOGIN: '/o/token/',
  LOGIN_REFRESH: '/o/token/refresh/',
  USER: '/user/',
  USER_PROFILE: 'user/profile/',
  USER_FOLLOWERS: '/user/followers/',
  POSTS: '/post/',
  COMMENTS: '/comment/',
  GROUPS:'/group-chat/',
  EMOTION:'/emotion/',
  // Các end-point khác nếu có
};
const authApi = (token) => {
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
};
export { BASE_URL, API_ENDPOINTS, authApi };