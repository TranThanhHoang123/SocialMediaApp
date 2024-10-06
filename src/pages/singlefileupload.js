import React, { useState } from 'react';
import { postComment } from '../services/commentService';

const SingleFileUploader = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    try {
      const content = "test upload file";
      const postId = 17;
      const filesList = [file]; // Tạo mảng chứa file

      // Gọi hàm postComment với dữ liệu mẫu
      const response = await postComment(postId, null, content, filesList, null); 

      if (response.success) {
        console.log('Tải lên bình luận thành công:', response.data);
        // Xử lý kết quả thành công (ví dụ: hiển thị thông báo, cập nhật giao diện)
      } else {
        console.error('Lỗi khi tải lên bình luận:', response.error);
        // Xử lý lỗi (ví dụ: hiển thị thông báo lỗi)
      }
    } catch (error) {
      console.error('Lỗi:', error);
      // Xử lý lỗi (ví dụ: hiển thị thông báo lỗi)
    }
  };

  return (
    <>
      <div className="input-group">
        <input id="file" type="file" onChange={handleFileChange} />
      </div>
      {file && (
        <section>
          File details:
          <ul>
            <li>Name: {file.name}</li>
            <li>Type: {file.type}</li>
            <li>Size: {file.size} bytes</li>
          </ul>
        </section>
      )}

      {file && (
        <button 
          onClick={handleUpload}
          className="submit"
        >Upload a file</button>
      )}
    </>
  );
};

export default SingleFileUploader;