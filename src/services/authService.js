import axios from 'axios';
import { BASE_URL, API_ENDPOINTS } from '../apiConfig';

const login = async (username, password) => {
  try {
    console.log("authServices.js")
    // Check if access token is still valid
    const expiresAt = localStorage.getItem('expires_at');
    const accessToken = localStorage.getItem('access_token');
    const currentTime = new Date().getTime();
    console.log(currentTime)  
    console.log(expiresAt)
    console.log(accessToken)
    if (expiresAt && accessToken && currentTime < expiresAt) {
      // Access token is still valid
      console.log("vẫn còn hạn")
      return { success: true, data: { 'expired_at': expiresAt, 'access_token': accessToken } };
    }

    const formData = new FormData();
    formData.append('grant_type', 'password');
    formData.append('client_id', process.env.REACT_APP_CLIENT_ID);
    formData.append('client_secret', process.env.REACT_APP_CLIENT_SECRET);
    formData.append('username', username);
    formData.append('password', password);

    const response = await axios.post(`${BASE_URL}${API_ENDPOINTS.LOGIN}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Save access_token and refresh_token to localStorage
    localStorage.setItem('access_token', response.data.access_token);
    localStorage.setItem('refresh_token', response.data.refresh_token);
    
    // Calculate expiration time and save
    const newExpiresAt = new Date().getTime() + response.data.expires_in * 1000; // Convert to milliseconds
    localStorage.setItem('expires_at', newExpiresAt);
    console.log("Authservices new")
    return { success: true, data: response.data };
  } catch (error) {
    // Check for 400 status and return custom message
    if (error.response && error.response.status === 400) {
      return { success: false, error: 'Tài khoản hoặc mật khẩu không hợp lệ' };
    }
    // Return other errors as is
    return { success: false, error: error.response ? error.response.data : 'Đã có lỗi xảy ra' };
  }
};

export default login;
