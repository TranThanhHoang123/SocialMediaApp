// src/services/commentService.js
import { API_ENDPOINTS, authApi } from '../apiConfig';

const getCommentList = async (postId, socialGroupId, page) => {
    try {
        console.log("lấy danh sách comment")

        // Kiểm tra xem access token có hợp lệ không
        const expiresAt = localStorage.getItem('expires_at');
        const accessToken = localStorage.getItem('access_token');
        const currentTime = new Date().getTime();

        if (expiresAt && accessToken && currentTime < expiresAt) {
            // Tạo object params để gửi đi, thêm social_group_id nếu có
            const params = {
                post_id: postId,
                page: page,
            };
            if (socialGroupId) {
                params.social_group_id = socialGroupId;
            }
            // Access token là hợp lệ, tiến hành fetch danh sách comment
            const response = await authApi(accessToken).get(API_ENDPOINTS.COMMENTS, { params });
            console.log(response.data);
            return { success: true, data: response.data };
        }
        else {
            // Nếu token hết hạn, trả về lỗi
            console.log('fetch comment thất bại do expired hết hạn hoặc không có accesstoken')
            return { success: false, error: 'Access token is expired or invalid.' };
        }
    } catch (error) {
        // Nếu có lỗi, có thể thêm logic để chuyển hướng đến trang đăng nhập
        console.error('Error fetching comment profile:', error);
        return { success: false, error: error.response?.data || 'An error occurred while fetching comment list.' };
    }
};
const getReplyCommentList = async (commentId, page) => {
    try {
        console.log("Lấy danh sách comment phản hồi");

        const expiresAt = localStorage.getItem('expires_at');
        const accessToken = localStorage.getItem('access_token');
        const currentTime = new Date().getTime();

        if (expiresAt && accessToken && currentTime < expiresAt) {
            // Tạo object params để gửi đi
            const params = {
                page: page,
            };

            // Access token là hợp lệ, tiến hành fetch danh sách comment phản hồi
            const response = await authApi(accessToken).get(`${API_ENDPOINTS.COMMENTS}${commentId}/reply/`, { params });
            console.log(response.data);
            return { success: true, data: response.data };
        } else {
            console.log('Fetch comment phản hồi thất bại do expired hết hạn hoặc không có accesstoken')
            return { success: false, error: 'Access token is expired or invalid.' };
        }
    } catch (error) {
        console.error('Error fetching comment replies:', error);
        return { success: false, error: error.response?.data || 'An error occurred while fetching comment replies.' };
    }
};


const postComment = async (postId, socialGroupId, content, filesList, parent) => {
    try {
        console.log("Thêm bình luận");

        const expiresAt = localStorage.getItem('expires_at');
        const accessToken = localStorage.getItem('access_token');
        const currentTime = new Date().getTime();

        if (expiresAt && accessToken && currentTime < expiresAt) {
            // Tạo FormData
            const data = new FormData();
            data.append('content', content);
            data.append('post_id', postId);
            console.log(filesList)
            filesList.forEach(file => {
                data.append('file', file);
            });

            // Thêm social_group_id và parent nếu có
            if (socialGroupId) {
                data.append('social_group_id', socialGroupId);
            }
            if (parent) {
                data.append('parent', parent);
            }

            const response = await authApi(accessToken).post(API_ENDPOINTS.COMMENTS, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
            return { success: true, data: response.data };
        } else {
            console.log('Thêm comment thất bại do expired hết hạn hoặc không có accesstoken');
            return { success: false, error: 'Access token is expired or invalid.' };
        }
    } catch (error) {
        console.error('Error to post comment:', error);
        return { success: false, error: error.response?.data || 'An error occurred while posting comment.' };
    }
};

const deleteComment = async (id) => {
    try {
        console.log("Xóa bình luận");

        const expiresAt = localStorage.getItem('expires_at');
        const accessToken = localStorage.getItem('access_token');
        const currentTime = new Date().getTime();

        if (expiresAt && accessToken && currentTime < expiresAt) {
            const response = await authApi(accessToken).delete(`${API_ENDPOINTS.COMMENTS}${id}/`);
            return { success: true, data: response.data };
        } else {
            console.log('Xóa comment thất bại do expired hết hạn hoặc không có accesstoken');
            return { success: false, error: 'Access token is expired or invalid.' };
        }
    } catch (error) {
        console.error('Error to delete comment:', error);
        return { success: false, error: error.response?.data || 'An error occurred while deleting comment.' };
    }
};
const updateComment = async (id, content, file, socialGroupId) => {
    try {
        console.log("Sửa bình luận");

        const expiresAt = localStorage.getItem('expires_at');
        const accessToken = localStorage.getItem('access_token');
        const currentTime = new Date().getTime();

        if (expiresAt && accessToken && currentTime < expiresAt) {
            // Tạo FormData
            const data = new FormData();
            data.append('content', content);
            if (file) {
                data.append('file', file);
            }

            // Thêm social_group_id nếu có
            if (socialGroupId) {
                data.append('social_group_id', socialGroupId);
            }

            const response = await authApi(accessToken).patch(`${API_ENDPOINTS.COMMENTS}${id}/`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
            return { success: true, data: response.data };
        } else {
            console.log('Sửa comment thất bại do expired hết hạn hoặc không có accesstoken');
            return { success: false, error: 'Access token is expired or invalid.' };
        }
    } catch (error) {
        console.error('Error to update comment:', error);
        return { success: false, error: error.response?.data || 'An error occurred while updating comment.' };
    }
};

export { getCommentList,getReplyCommentList, postComment, deleteComment, updateComment }; 
