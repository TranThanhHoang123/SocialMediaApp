import React, { createContext, useContext, useState } from 'react';

// Tạo CommentContext
const CommentContext = createContext();

// Tạo provider cho CommentContext
export const CommentProvider = ({ children }) => {
    const [commentCount, setCommentCount] = useState(0); // Khởi tạo commentCount

    return (
        <CommentContext.Provider value={{ commentCount, setCommentCount }}>
            {children}
        </CommentContext.Provider>
    );
};
export default CommentContext;
