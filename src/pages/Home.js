// src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import NavbarHome from '../components/Navbar/NavbarHome';
import PostItemBlock from '../components/Post/PostItemBlock';
import { getPostList } from '../services/postService';
import PostPostItemBlock from '../components/Post/PostPostItem';

const HomePage = () => {
    const [posts, setPosts] = useState([]); // Tạo state để lưu danh sách bài viết
    const [page, setPage] = useState(1); // Tạo state để lưu danh sách bài viết
    const [loading, setLoading] = useState(false);
    const [nextPage, setNextPage] = useState(null);

    const fetchPosts = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const response = await getPostList({ page }); // Thêm page vào tham số
            if (response.success) {
                console.info("lấy danh sách post + vào")
                setPosts((posts) => [...posts, ...response.data.results]); // Gộp post mới vào danh sách
                setNextPage(response.data.next)
            } else {
                console.error("Lỗi khi lấy danh sách post:", response.error);
            }
        } catch (error) {
            console.error("Xảy ra lỗi không mong muốn:", error);
        } finally {
            setLoading(false); // Ngừng loading
        }
    };

    useEffect(() => {
        fetchPosts()
    }, [page]); // Chạy một lần khi component mount

    const handlePostAdded = (newPost) => {
        console.info("Thêm post")
        setPosts([newPost, ...posts]);
    };
    const handlePostDeleted = (id) => {
        console.info("xóa post")
        // Lọc ra các post có id khác với id cần xóa
        const updatedPosts = posts.filter(post => post.id !== id);
        setPosts(updatedPosts);
    };
    const handlePostUpdated = (updatedPost) => {
        // Tạo danh sách replies mới với post đã được cập nhật
        const updatedPosts = posts.map((post) =>
            post.id === updatedPost.id ? updatedPost : post
        );

        // Cập nhật lại state của replies
        setPosts(updatedPosts);
    };
    // Xử lý scroll để load thêm post
    const handleScroll = (e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        if (scrollHeight - scrollTop <= clientHeight * 1.5 && !loading) {
            if (nextPage !== null) {
                setPage(page + 1); // Tăng page để lấy post tiếp theo
                console.log("page post:", page)
                console.log("page nextPage:", nextPage)
            }
        }
    };
    return (
        <div className="flex flex-col h-screen">
            <NavbarHome className="fixed top-0 left-0 right-0 z-10" />
            <div className="flex flex-col items-center px-4 overflow-auto h-full">
                <div className="max-w-[60%] mb-2 w-full">
                    <PostPostItemBlock 
                        handlePostAdded={handlePostAdded}
                        handlePostDeleted ={handlePostDeleted }
                        handlePostUpdated ={handlePostUpdated}
                    />
                </div>
                {posts.map((post) => (
                    <div className="max-w-[60%] mb-10 w-full" key={post.id}>
                        <PostItemBlock
                            id={post.id}
                            profilePicture={post.user.profile?.profile_picture || 'http://127.0.0.1:8000/static/user/avatar.png'}
                            username={post.user.username}
                            createdDate={post.created_date}
                            content={post.content}
                            media={post.media}
                            emotions={post.emotions}
                            postCount={post.post_count}
                            emotion={post.emotion}
                            posts={post.posts}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
