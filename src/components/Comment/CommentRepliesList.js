import React, { useState, useEffect } from "react";
import CommentItemBlock from "./CommentItem";
import { getReplyCommentList } from "../../services/commentService";
import PostCommentItemBlock from "./PostCommentItem";

const CommentRepliesListBlock = ({ commentId, showPostCommentItem, showRepliesListItem, onDelete, onCreate }) => {
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);


  // Hàm lấy danh sách comment phản hồi
  const fetchReplies = async () => {
    console.info("fetchReplies")
    if (loading) return;
    setLoading(true);
    try {
      const response = await getReplyCommentList(commentId, page);
      if (response.success) {
        setReplies((prevReplies) => [...prevReplies, ...response.data.results]);
        setNextPage(response.data.next);
      } else {
        console.error("Lỗi khi lấy danh sách comment phản hồi:", response.error);
      }
    } catch (error) {
      console.error("Xảy ra lỗi không mong muốn:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleCommentDeleted = (id) => {
    // Lọc ra các comment có id khác với id cần xóa
    const updatedComments = replies.filter(comment => comment.id !== id);
    setReplies(updatedComments);
    onDelete()
  };
  const handleCommentUpdated = (updatedComment) => {
    // Tạo danh sách replies mới với comment đã được cập nhật
    const updatedReplies = replies.map((comment) =>
      comment.id === updatedComment.id ? updatedComment : comment
    );
    
    // Cập nhật lại state của replies
    setReplies(updatedReplies);
  };
  const handleCommentAdded = (newComment) => {
    setReplies([newComment, ...replies]);
    onCreate()
  };
  useEffect(() => {
    fetchReplies();
  }, [commentId, page]);

  const handleLoadMore = () => {
    if (nextPage !== null) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="mt-2"> {/* Thêm margin-top */}
      {/* Post comment section */}
      {showPostCommentItem && (
        <section className="mt-auto h-auto">
          <div className="p-0.5 bg-transparent rounded-md">
            <PostCommentItemBlock
              socialGroupId={null}
              parentCommentId={commentId}
              handleCommentAdded={handleCommentAdded}
            />
          </div>
        </section>
      )}
      {showRepliesListItem && (
        <div>
          {
            replies.map((reply) => (
              <div key={reply.id} className="mb-4">
                <CommentItemBlock
                  id={reply.id}
                  username={reply.user.username}
                  content={reply.content}
                  file={reply.file}
                  repliesCount={reply.replies_count}
                  profilePicture={reply.user.profile?.profile_picture}
                  createdDate={reply.created_date}
                  handleCommentDeleted={handleCommentDeleted}
                  onUpdatedComment = {handleCommentUpdated}
                />
              </div>
            ))
          }
        </div>
      )}

      {/* Nút "Load more replies" */}
      {nextPage !== null && (
      <button onClick={handleLoadMore} className="text-blue-500 hover:underline">
        Load more replies
      </button>
      )}
    </div>
  );
};

export default CommentRepliesListBlock;