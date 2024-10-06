// src/services/emotionService.js
import { API_ENDPOINTS, authApi } from '../apiConfig';

const postEmotion = async ({ postId, emotionType, socialGroupId }) => { // Thêm socialGroupId (tùy chọn)
    try {
        console.log("chỉnh sửa emotion");

        const expiresAt = localStorage.getItem('expires_at');
        const accessToken = localStorage.getItem('access_token');
        const currentTime = new Date().getTime();

        if (expiresAt && accessToken && currentTime < expiresAt) {
            // Tạo object data để gửi đi, thêm social_group_id nếu có
            const data = {
                post_id: postId,
                emotion_type: emotionType
            };
            if (socialGroupId) {
                data.social_group_id = socialGroupId;
            }

            const response = await authApi(accessToken).post(API_ENDPOINTS.EMOTION, data);
            console.log(response.data);
            return { success: true, data: response.data };
        } else {
            console.log('thực hiện đổi emotion thất bại do expired hết hạn hoặc không có accesstoken');
            return { success: false, error: 'Access token is expired or invalid.' };
        }
    } catch (error) {
        console.error('Error to post emotion:', error);
        return { success: false, error: error.response?.data || 'An error occurred while post emotion.' };
    }
};

const deleteEmotion = async ({ postId, socialGroupId }) => { // Thêm socialGroupId (tùy chọn)
    try {
        console.log("xóa bài Emotion");

        const expiresAt = localStorage.getItem('expires_at');
        const accessToken = localStorage.getItem('access_token');
        const currentTime = new Date().getTime();

        if (expiresAt && accessToken && currentTime < expiresAt) {
            // Tạo object data để gửi đi, thêm social_group_id nếu có
            const data = {
                post_id: postId,
            };
            if (socialGroupId) {
                data.social_group_id = socialGroupId;
            }

            const response = await authApi(accessToken).delete(API_ENDPOINTS.EMOTION, { params: data });
            console.log(response.data);
            return { success: true, data: response.data };
        } else {
            console.log('thực hiện xóa bài viết thất bại do expired hết hạn hoặc không có accesstoken');
            return { success: false, error: 'Access token is expired or invalid.' };
        }
    } catch (error) {
        console.error('Error to delete post:', error);
        return { success: false, error: error.response?.data || 'An error occurred while deleting post.' };
    }
};

export { postEmotion, deleteEmotion }; 