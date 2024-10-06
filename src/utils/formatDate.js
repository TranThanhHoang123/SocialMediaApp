// src/util/formatDate.js
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// Kích hoạt plugin relativeTime
dayjs.extend(relativeTime);

// Hàm formatDate để hiển thị thời gian từ lúc bài viết được đăng
const formatDate = (date) => {
    return dayjs(date).fromNow();
};

export default formatDate;