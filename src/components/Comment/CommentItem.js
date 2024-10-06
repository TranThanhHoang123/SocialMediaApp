import React, { useState, useCallback } from "react";
import UserInfoItem from "../User/UserInfoItem";
import formatDate from "../../utils/formatDate";
import MediaPreview from "../Media/MediaPreview";
import CommentItemDropDown from "./CommentItemDropDown";
import { deleteComment, updateComment } from "../../services/commentService";
import { comment } from "postcss";
import UpdateCommentItemBlock from "./UpdateCommentItem";
import CommentRepliesListBlock from "./CommentRepliesList";
const CommentItemBlock = ({ id, userId, username, content, file, profilePicture, createdDate, repliesCount, handleCommentDeleted, onUpdatedComment }) => {
  const [commentId, setCommentId] = useState(id);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // State để quản lý chế độ chỉnh sửa
  const [editedContent, setEditedContent] = useState(content); // State để lưu nội dung đã chỉnh sửa
  const [editedFile, setEditedFile] = useState(file); // State để lưu file đã chỉnh sửa
  const [showReplies, setShowReplies] = useState(false); // State để lưu file đã chỉnh sửa
  const [showPostCommentItem, setShowPostCommentItem] = useState(false);
  const [showRepliesListItem, setShowRepliesListItem] = useState(false);
  const [currentRepliesCount, setCurrentRepliesCount] = useState(repliesCount);
  const handleDelete = async () => {
    try {
      const response = await deleteComment(commentId);
      if (response.success) {
        console.log('xóa bình luận thành công');
        handleCommentDeleted(commentId)
      } else {
        console.error('Lỗi khi xóa bình luận:', response.error);
        // Xử lý lỗi ở đây
      }
    } catch (error) {
      console.error('Lỗi không mong muốn:', error);
      // Xử lý lỗi ở đây
    }
  };
  const handleModify = async () => {
    setIsEditing(true);
  };
  const handleIncreaseReplyCount = async => {
    setCurrentRepliesCount(currentRepliesCount+1)
  };
  const handleDecreaseReplyCount = async => {
    setCurrentRepliesCount(currentRepliesCount-1)
  };
  const handleSaveEdit = async (updateComment) => {
    setEditedContent(updateComment.content)
    setEditedFile(updateComment.file)
    onUpdatedComment(updateComment)
    setIsEditing(false);
  };
  const openImageViewer = useCallback(() => {
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setIsViewerOpen(false);
  };
  return (
    <div className="flex space-x-2 flex-row w-full">
      {/* Sử dụng UserInfoItem */}
      <div className="w-3/10 flex-shrink-0">
        <UserInfoItem
          id={userId}
          profilePicture={profilePicture}
        />
      </div>

      {/* Nội dung của comment */}
      <div className="p-2 w-full relative">
        <div className="p-2 w-2/6 bg-gray-100 rounded-lg">
          {/* hiển thị info */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-800 font-semibold text-sm">{username}</p>
              <p className="text-gray-400 text-xs">{formatDate(createdDate)}</p>
            </div>
            {/* hiển thị các chức năng */}
            <div>
              <CommentItemDropDown onDelete={handleDelete} onModify={handleModify} />
            </div>
          </div>

          {/* Hiển thị phần content */}
          <div>
            {isEditing ? ( // Sử dụng input khi đang chỉnh sửa
              <div>
                <UpdateCommentItemBlock
                  commentId={commentId}
                  initialContent={editedContent}
                  initialFile={editedFile} // Truyền file vào initialFile
                  handleSaveEdit={handleSaveEdit} // Truyền hàm handleSaveEdit vào onCommentUpdated
                  onCancel={() => setIsEditing(false)}
                />
              </div>
            ) : ( // Sử dụng p khi không chỉnh sửa
              <div>
                <p className="text-gray-700 font-normal leading-relaxed mt-1">{editedContent}</p>
                {/* Hiển thị file */}
                {editedFile && (
                  <div className="mt-2 relative" onClick={openImageViewer}>
                    <div className="w-full mt-1" style={{ aspectRatio: '16/9' }}> {/* Giả sử tỷ lệ khung hình là 16:9, điều chỉnh nếu cần */}
                      {editedFile.endsWith(".mp4") || editedFile.endsWith(".mov") ? (
                        <video src={editedFile} controls className="w-full h-full object-cover rounded-md" />
                      ) : (
                        <img src={editedFile} alt="Comment Media" className="w-full h-full object-cover rounded-md" />
                      )}
                    </div>
                  </div>
                )}
                {/* Hiển thị chức năng comment */}
                <div className="flex justify-start items-center mt-1">
                  <div>
                    <button className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium mr-4">
                      Like
                    </button>
                  </div>

                  <div>
                    <button type="button"
                      className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                      onClick={() => { setShowPostCommentItem(!showPostCommentItem) }}
                    >
                      <svg className="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                      </svg>
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div>
          { /* hiển thị số lượng reply */}
          <div>
            {currentRepliesCount > 0 && (
              <button
                className="text-blue-500 mt-2 rounded-full px-3 py-1 hover:bg-blue-500 hover:bg-opacity-20" // Thêm các class mới
                onClick={() => { setShowRepliesListItem(!showRepliesListItem) }}
              >
                {currentRepliesCount} replies
              </button>
            )}
          </div>
          {/*hiên thị danh sách reply */}
          {/* {showReplies && ( */}
          <div className="ml-4">
            <CommentRepliesListBlock
              commentId={commentId}
              showPostCommentItem={showPostCommentItem}
              showRepliesListItem={showRepliesListItem}
              onCreate = {handleIncreaseReplyCount}
              onDelete = {handleDecreaseReplyCount}
            />
          </div>
          {/* )} */}
        </div>
        {/* Hiển thị MediaPreview nếu có file và isViewerOpen là true */}
        {isViewerOpen && file && (
          <MediaPreview
            media={[{ file }]}
            selectedIndex={0}
            onClose={closeImageViewer}
          />
        )}
      </div>
      {/* Hiển thị trạng thái replies */}
    </div>
  );
};

export default CommentItemBlock;