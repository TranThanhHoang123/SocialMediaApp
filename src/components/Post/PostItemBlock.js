import likeIcon from "../../assets/icons/like.svg";
import loveIcon from "../../assets/icons/love.svg";
import dislikeIcon from "../../assets/icons/dislike.svg";
import normalIcon from "../../assets/icons/normal.svg";
import smileIcon from "../../assets/icons/smile.svg";
import commentIcon from "../../assets/icons/comment.svg";
import { useState, useEffect, useCallback, createContext } from "react";
import formatDate from "../../utils/formatDate";
import { postEmotion, deleteEmotion } from "../../services/emotionService";
import MediaPreview from "../Media/MediaPreview";
import CommentItemBlock from "../Comment/CommentItem";
import PostCommentItemBlock from "../Comment/PostCommentItem";
import { getCommentList } from "../../services/commentService";
import CommentListPreview from "../Comment/CommentListPreview";
import { PostProvider } from "../../contexts/PostContext";
import PostItemDropDown from "./PostItemDropDown";
import { deletePost } from "../../services/postService";

const PostItemBlock = ({
    id,
    profilePicture,
    username,
    createdDate,
    content,
    media,
    emotions,
    commentCount,
    emotion,
    comments,
    onEmotionChange,
    onCommentAdded,
    handlePostDeleted,
    onUpdatedPost
}) => {
    const [postId, setPostId] = useState(id);
    const [currentEmotion, setCurrentEmotion] = useState(emotion);
    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [isVideoViewerOpen, setIsVideoViewerOpen] = useState(false);
    const [emotionList, setEmotionList] = useState(emotions);
    const [isCommentListOpen, setIsCommentListOpen] = useState(false);
    const [commentCountState, setCommentCountState] = useState(commentCount);
    const [mediaList, setMediaList] = useState(media);
    const [mediaRemoveList, setMediaRemoveList] = useState([]);

    useEffect(() => {

    }, [currentEmotion]);
    const handleCommentButtonClick = async () => {
        setIsCommentListOpen(!isCommentListOpen);
    };
    const openImageViewer = useCallback((index) => {
        setCurrentImage(index);
        if (media[index].file.endsWith('.mp4') || media[index].file.endsWith('.mov')) {
            setIsVideoViewerOpen(true);
        } else {
            setIsViewerOpen(true);
        }
    }, []);
    const closeImageViewer = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
        setIsVideoViewerOpen(false);
    };

    const handleEmotionClick = async (newEmotion) => {
        try {
            if (newEmotion === currentEmotion) {
                const response = await deleteEmotion({ postId: id });
                if (response.success) {
                    setCurrentEmotion(null);

                    // Cập nhật số lượng emotion
                    setEmotionList(prevEmotions => {
                        return prevEmotions.map(em => {
                            if (em.emotion_type === currentEmotion) {
                                return { ...em, count: em.count - 1 };
                            }
                            return em;
                        });
                    });
                } else {
                    console.error("Lỗi khi xóa emotion:", response.error);
                }
            } else {
                const response = await postEmotion({ postId: id, emotionType: newEmotion });
                if (response.success) {
                    setCurrentEmotion(newEmotion);
                    if (onEmotionChange) {
                        onEmotionChange(id, newEmotion);
                    }

                    // Cập nhật số lượng emotion
                    setEmotionList(prevEmotions => {
                        return prevEmotions.map(em => {
                            if (em.emotion_type === newEmotion) {
                                return { ...em, count: em.count + 1 };
                            } else if (currentEmotion && em.emotion_type === currentEmotion) {
                                return { ...em, count: em.count - 1 };
                            }
                            return em;
                        });
                    });
                } else {
                    console.error("Lỗi khi cập nhật emotion:", response.error);
                }
            }
        } catch (error) {
            console.error("Xảy ra lỗi không mong muốn:", error);
        }
    };
    const handleDelete = async () => {
        try {
            const response = await deletePost(postId);
            if (response.success) {
                console.log('xóa post thành công');
                handlePostDeleted(postId)
            } else {
                console.error('Lỗi khi xóa post:', response.error);
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
    const handleSaveEdit = async (updatePost) => {
        setEditedContent(updateComment.content)
        setEditedFile(updateComment.file)
        onUpdatedComment(updateComment)
        setIsEditing(false);
    };

    return (
        <PostProvider postId={id}>
            <div>
                {/* Thêm key ở đây */}
                <div className="bg-white p-8 rounded-lg shadow-md">
                    {/* User Info with Three-Dot Menu */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                            <img src={profilePicture} alt="User Avatar" className="w-8 h-8 rounded-full" />
                            <div>
                                <p className="text-gray-800 font-semibold">{username}</p>
                                <p className="text-gray-500 text-sm">{formatDate(createdDate)}</p>
                            </div>
                        </div>
                        <div className="text-gray-500 cursor-pointer">
                            <PostItemDropDown onDelete={handleDelete} onModify={handleModify} />
                        </div>
                    </div>

                    {/* Media (Image or Video) */}
                    {Array.isArray(media) && media.length > 0 && (
                        <div className="mb-4 relative"
                            onClick={() => openImageViewer(0)}
                        >
                            {/* Hiển thị media đầu tiên */}
                            {media[0] && (
                                <div
                                    className="w-full"
                                    style={{ aspectRatio: '16/9' }} // Giả sử tỷ lệ khung hình là 16:9, điều chỉnh nếu cần
                                >
                                    {media[0].file.endsWith('.mp4') || media[0].file.endsWith('.mov') ? (
                                        <video src={media[0].file} controls className="w-full h-full object-cover rounded-md" />
                                    ) : (
                                        <img src={media[0].file} alt="Post Media 0" className="w-full h-full object-cover rounded-md" />
                                    )}

                                    {/* Overlay nếu có nhiều hơn 1 media */}
                                    {media.length > 1 && (
                                        <div className="absolute inset-y-0 right-0 w-1/4 bg-gray-500 bg-opacity-50 flex items-center justify-center rounded-md">
                                            <span className="text-white font-bold text-2xl">+{media.length - 1}</span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {isViewerOpen && (
                        <MediaPreview
                            media={media}
                            selectedIndex={currentImage}
                            onClose={closeImageViewer}
                        />
                    )}


                    {/* Like and Comment Section */}
                    <div className="flex items-center justify-between text-gray-500">
                        <div className="flex items-center space-x-2">
                            {/* Emotion counts */}
                            {(() => {
                                // Hàm để lấy icon dựa trên emotion_type
                                const getIconByType = (type) => {
                                    switch (type) {
                                        case "like":
                                            return likeIcon;
                                        case "love":
                                            return loveIcon;
                                        case "dislike":
                                            return dislikeIcon;
                                        case "normal":
                                            return normalIcon;
                                        case "smile":
                                            return smileIcon;
                                        default:
                                            return null; // Hoặc một icon mặc định nếu cần
                                    }
                                };

                                return emotionList.map((em) => (
                                    <div key={em.emotion_type} className="flex items-center ">
                                        <button
                                            onClick={() => handleEmotionClick(em.emotion_type)}
                                            className={`flex justify-center items-center gap-2 px-2 rounded-full p-1 ${currentEmotion === em.emotion_type ? "bg-blue-500 text-white" : "hover:bg-gray-50"
                                                }`}
                                        >
                                            <img src={getIconByType(em.emotion_type)} alt={em.emotion_type} className={`w-6 h-6 ${currentEmotion === em.emotion_type ? "fill-white" : "fill-black"}`} />
                                            <span>{em.count}</span>
                                        </button>
                                    </div>
                                ));
                            })()}
                        </div>

                        <button
                            className="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1"
                            onClick={handleCommentButtonClick}
                        >
                            <img src={commentIcon} alt="comment" className="w-5 h-5" />
                            <span>{commentCountState} Comment</span>
                        </button>
                    </div>
                    {/* Hiển thị CommentListViewer nếu isCommentListOpen là true */}
                    {isCommentListOpen && (
                        <CommentListPreview
                            onClose={() => setIsCommentListOpen(false)}
                        />
                    )}
                </div>
            </div>
        </PostProvider>
    );
};

export default PostItemBlock;