// src/services/profileService.js
import { API_ENDPOINTS, authApi } from '../apiConfig';

const getPostList = async ({ page }) => {
  try {
    console.log("lấy post list")

    // Kiểm tra xem access token có hợp lệ không
    const expiresAt = localStorage.getItem('expires_at');
    const accessToken = localStorage.getItem('access_token');
    const currentTime = new Date().getTime();

    if (expiresAt && accessToken && currentTime < expiresAt) {
      // Tạo object params để gửi đi, thêm social_group_id nếu có
      const params = {
        page: page,
      };
      // Access token là hợp lệ, tiến hành fetch thông tin người dùng
      const response = await authApi(accessToken).get(API_ENDPOINTS.POSTS,{params});
      console.log(response.data);
      return { success: true, data: response.data };
    }
    else {
      // Nếu token hết hạn, trả về lỗi
      console.log('fet post thất bại do expired hết hạn hoặc không có accesstoken')
      return { success: false, error: 'Access token is expired or invalid.' };
    }
  } catch (error) {
    // Nếu có lỗi, có thể thêm logic để chuyển hướng đến trang đăng nhập
    console.error('Error fetching post list:', error);
    return { success: false, error: error.response?.data || 'An error occurred while fetching user profile.' };
  }
};
const postPost = async (socialGroupId, content, mediaList, visibility) => {
  try {
      console.log("Đăng bài viết");

      const expiresAt = localStorage.getItem('expires_at');
      const accessToken = localStorage.getItem('access_token');
      const currentTime = new Date().getTime();

      if (expiresAt && accessToken && currentTime < expiresAt) {
          // Tạo FormData
          const data = new FormData();
          data.append('content', content);
          
          // Thêm media vào FormData
          mediaList.forEach(media => {
              data.append('media', media);
          });

          // Thêm social_group_id và visibility nếu có
          if (socialGroupId) {
              data.append('social_group_id', socialGroupId);
          }
          if (visibility) {
              data.append('visibility', visibility);
          }

          const response = await authApi(accessToken).post(API_ENDPOINTS.POSTS, data, {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          });
          console.log(response.data);
          return { success: true, data: response.data };
      } else {
          console.log('Đăng bài viết thất bại do expired hết hạn hoặc không có accesstoken');
          return { success: false, error: 'Access token is expired or invalid.' };
      }
  } catch (error) {
      console.error('Error to post post:', error);
      return { success: false, error: error.response?.data || 'An error occurred while posting post.' };
  }
};

const updatePost = async (postId, socialGroupId, content, mediaList, visibility, removeMediaIds) => {
  try {
      console.log("Cập nhật bài viết");

      const expiresAt = localStorage.getItem('expires_at');
      const accessToken = localStorage.getItem('access_token');
      const currentTime = new Date().getTime();

      if (expiresAt && accessToken && currentTime < expiresAt) {
          // Tạo FormData
          const data = new FormData();
          data.append('content', content);

          // Thêm media vào FormData
          mediaList.forEach(media => {
              data.append('media', media);
          });

          // Thêm social_group_id và visibility nếu có
          if (socialGroupId) {
              data.append('social_group_id', socialGroupId);
          }
          if (visibility) {
              data.append('visibility', visibility);
          }

          // Thêm remove_media_ids vào FormData
          removeMediaIds.forEach(id => {
              data.append('remove_media_id', id);
          });

          const response = await authApi(accessToken).patch(`${API_ENDPOINTS.POSTS}${postId}/`, data, { // Sửa endpoint API
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          });
          console.log(response.data);
          return { success: true, data: response.data };
      } else {
          console.log('Cập nhật bài viết thất bại do expired hết hạn hoặc không có accesstoken');
          return { success: false, error: 'Access token is expired or invalid.' };
      }
  } catch (error) {
      console.error('Error to update post:', error);
      return { success: false, error: error.response?.data || 'An error occurred while updating post.' };
  }
};

const deletePost = async (postId) => {
  try {
      console.log("Xóa bài viết");

      const expiresAt = localStorage.getItem('expires_at');
      const accessToken = localStorage.getItem('access_token');
      const currentTime = new Date().getTime();

      if (expiresAt && accessToken && currentTime < expiresAt) {
          const response = await authApi(accessToken).delete(`${API_ENDPOINTS.POSTS}${postId}/`);
          console.log(response.data);
          return { success: true, data: response.data };
      } else {
          console.log('Xóa bài viết thất bại do expired hết hạn hoặc không có accesstoken');
          return { success: false, error: 'Access token is expired or invalid.' };
      }
  } catch (error) {
      console.error('Error to delete post:', error);
      return { success: false, error: error.response?.data || 'An error occurred while deleting post.' };
  }
};

export { getPostList,postPost,deletePost,updatePost };
