// src/services/profileService.js
import { API_ENDPOINTS, authApi } from '../apiConfig';

const fetchUserProfile = async () => {
  try {
    console.log("lấy profle")

    // Kiểm tra xem access token có hợp lệ không
    const expiresAt = localStorage.getItem('expires_at');
    const accessToken = localStorage.getItem('access_token');
    const currentTime = new Date().getTime();

    if (expiresAt && accessToken && currentTime < expiresAt) {
      // Access token là hợp lệ, tiến hành fetch thông tin người dùng
      const response = await authApi(accessToken).get(API_ENDPOINTS.USER_PROFILE);
      // Lưu thông tin người dùng vào localStorage
      localStorage.setItem('user_profile', JSON.stringify(response.data));
      console.log(response.data);
      return { success: true, data: response.data };
    }
    else{
      // Nếu token hết hạn, trả về lỗi
      console.log('fetusser thất bại do expired hết hạn hoặc không có accesstoken')
      return { success: false, error: 'Access token is expired or invalid.' };
    }
  } catch (error) {
    // Nếu có lỗi, có thể thêm logic để chuyển hướng đến trang đăng nhập
    console.error('Error fetching user profile:', error);
    return { success: false, error: error.response?.data || 'An error occurred while fetching user profile.' };
  }
};

export default fetchUserProfile;
