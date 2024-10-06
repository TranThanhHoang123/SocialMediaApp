// src/services/profileService.js
import { API_ENDPOINTS, authApi } from '../apiConfig';

const fetchGroupChatList = async (name) => {
    try {
      const accessToken = localStorage.getItem('access_token');
  
      if (!accessToken) {
        return { success: false, error: 'No access token found.' };
      }
  
      console.log("Fetching group chat list...");
  
      // Gọi API để lấy danh sách nhóm chat với tham số name
      const response = await authApi(accessToken).get(`${API_ENDPOINTS.GROUPS}?name=${encodeURIComponent(name)}`);
      
      // Kiểm tra dữ liệu và trả về kết quả
      if (response.data) {
        return { success: true, data: response.data };
      } else {
        return { success: false, error: 'No data received.' };
      }
    } catch (error) {
      console.error('Error fetching group chat list:', error);
      return { success: false, error: error.response?.data || 'An error occurred while fetching group chat list.' };
    }
  };
  
  export { fetchGroupChatList };
