import React, { useState, useRef, useContext } from 'react';
import { postComment } from '../../services/commentService';
import UserInfoItem from '../User/UserInfoItem';
import EmojiPicker from 'emoji-picker-react';
import PostContext from '../../contexts/PostContext';

const PostCommentItemBlock = ({ socialGroupId, parentCommentId, handleCommentAdded }) => {
  const { postId } = useContext(PostContext);
  const [content, setContent] = useState('');
  const [filesList, setFilesList] = useState([]);
  const fileInputRef = useRef(null);
  const userProfile = JSON.parse(localStorage.getItem("user_profile"));
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const onEmojiClick = (emojiObject) => {
    setChosenEmoji(emojiObject);
    console.log(emojiObject)
    setContent(content + emojiObject.emoji);
  };
  const handleFileButtonClick = () => {
    fileInputRef.current.click(); // Mở file picker khi button được click
  };
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFilesList([...e.target.files]); // Cập nhật state filesList với file được chọn
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await postComment(postId, socialGroupId, content, filesList, parentCommentId);
      if (response.success) {
        console.log('Bình luận đã gửi thành công:', response.data);
        handleCommentAdded(response.data)
        setContent('');
        setFilesList([]); // Xóa danh sách file sau khi gửi
      } else {
        console.error('Lỗi khi gửi bình luận:', response.error);
        // Xử lý lỗi ở đây
      }
    } catch (error) {
      console.error('Lỗi không mong muốn:', error);
      // Xử lý lỗi ở đây
    }
  };
  return (
    <div className="flex space-x-2 flex-row w-full">
      <div className="w-3/10 flex-shrink-0">
        <UserInfoItem
          id={userProfile.id}
          profilePicture={
            userProfile?.profile?.profile_picture || "default-avatar-url"
          }
        />
      </div>
      {/* Nội dung của thêm comment */}
      <div className="p-2 w-full relative">
        <form className="mb-6" onSubmit={handleSubmit}>
          <div className="flex">
            <div className="flex-1">
              <div className="py-2 px-2 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200   
 dark:bg-gray-800 dark:border-gray-700">
                <textarea
                  id="comment"
                  rows="1"
                  className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0   
 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                  placeholder="Write a comment..."
                  value={content}
                  // Liên kết giá trị với state
                  onChange={(e) => setContent(e.target.value)} // Cập nhật state khi nội dung thay đổi
                  required
                />
                <div className="flex items-center space-x-2">
                  <div>
                    <button type="button" onClick={handleFileButtonClick}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.0" stroke="currentColor" className="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
                      </svg>
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"  // Ẩn input file
                    />
                  </div>
                  <div className="relative er:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 " >
                    <button type="button" onClick={() => setShowEmojiPicker(!showEmojiPicker)}> {/* Button hiển thị emoji picker */}
                      <span role="img" aria-label="emoji">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                        </svg>
                      </span> {/* Hoặc sử dụng icon khác */}
                    </button>
                    {showEmojiPicker && ( // Hiển thị emoji picker khi showEmojiPicker là true

                      <div className="absolute z-10">
                        <EmojiPicker onEmojiClick={onEmojiClick} />
                      </div>
                    )}
                  </div>
                </div>
                {/* Hiển thị file */}
                <div className="mt-2">
                  {filesList.map((file, index) => (
                    <div key={index} className="flex items-center">
                      {file.type.startsWith('image/') ? (
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          className="w-16 h-16 object-cover mr-2"
                        />
                      ) : file.type.startsWith('video/') ? (
                        <video
                          src={URL.createObjectURL(file)}
                          controls
                          className="w-32 h-24 mr-2"
                        />
                      ) : (
                        <span className="mr-2">{file.name}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <button type="submit"
                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white   
 bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                Post comment
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>

  );
};

export default PostCommentItemBlock;