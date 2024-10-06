import { useState, useEffect, useContext } from "react";
import CommentItemBlock from "./CommentItem";
import PostContext from '../../contexts/PostContext';
import { getCommentList } from "../../services/commentService";
import PostCommentItemBlock from "./PostCommentItem";

const CommentListPreview = ({ onClose }) => {
  const [comments, setComments] = useState([]);
  const { postId } = useContext(PostContext);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState('');
  // Hàm lấy danh sách comment
  const fetchComments = async () => {
    if (loading) return; // Ngăn không cho gọi nhiều lần
    setLoading(true);
    try {
      const response = await getCommentList(postId, null, page); // Thêm page vào tham số
      if (response.success) {
        console.info("lấy danh sách comment + vào")
        setComments((comments) => [...comments, ...response.data.results]); // Gộp comment mới vào danh sách
        setNextPage(response.data.next)
      } else {
        console.error("Lỗi khi lấy danh sách comment:", response.error);
      }
    } catch (error) {
      console.error("Xảy ra lỗi không mong muốn:", error);
    } finally {
      setLoading(false); // Ngừng loading
    }
  };
  useEffect(() => {
    fetchComments();
  }, [postId, page]);
  const handleCommentAdded = (newComment) => {
    setComments([newComment, ...comments]);
  };
  const handleCommentDeleted = (id) => {
    // Lọc ra các comment có id khác với id cần xóa
    const updatedComments = comments.filter(comment => comment.id !== id);
    setComments(updatedComments);
  };
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose(); // Gọi hàm onClose khi nhấn Esc
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Dọn dẹp event listener khi component unmount
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);
  // Xử lý scroll để load thêm comment
  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollHeight - scrollTop <= clientHeight * 1.5 && !loading) {
      if (nextPage !== null) {
        setPage((prevPage) => prevPage + 1); // Tăng page để lấy comment tiếp theo
        console.log("page comment:", page)
        console.log("page nextPage:", nextPage)
      }
    }
  };
  const handleCommentUpdated = (updatedComment) => {
    // Tạo danh sách replies mới với comment đã được cập nhật
    const updatedComments = comments.map((comment) =>
      comment.id === updatedComment.id ? updatedComment : comment
    );
    
    // Cập nhật lại state của replies
    setComments(updatedComments);
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg w-full max-w-[100vw] max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Comment List</h2>
          <button onClick={onClose} className="p-2 bg-transparent rounded-full">
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2" />
            </svg>
          </button>
        </div>

        {/* Comment List */}
        <div className="overflow-y-auto flex-grow mb-4 max-h-[60vh]" onScroll={handleScroll}>
          {comments.map((comment) => (
            <div key={comment.id} className="mb-4">
              <CommentItemBlock
                id={comment.id}
                username={comment.user.username}
                content={comment.content}
                file={comment.file}
                repliesCount={comment.replies_count}
                profilePicture={comment.user.profile?.profile_picture}
                createdDate={comment.created_date}
                handleCommentDeleted={handleCommentDeleted}
                onUpdatedComment = {handleCommentUpdated}

              />
            </div>
          ))}
          {loading && (
            <div className="flex justify-center items-center py-2">
              <svg className="animate-spin h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0A8 8 0 014 12z" />
              </svg>
            </div>
          )}
        </div>

        {/* Post comment section */}
        <section className="mt-auto h-auto">
          <div className="p-0.5 bg-transparent rounded-md">
            <PostCommentItemBlock
              socialGroupId={null}
              parentCommentId={null}
              handleCommentAdded={handleCommentAdded}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default CommentListPreview;