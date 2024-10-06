// src/contexts/PostContext.js
import React, { createContext, useState } from 'react';

// Tạo Context
const PostContext = createContext();

// Tạo Provider
export const PostProvider = ({ children, postId }) => {
  const [currentPostId, setCurrentPostId] = useState(postId);

  return (
    <PostContext.Provider value={{ postId: currentPostId, setPostId: setCurrentPostId }}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContext;
