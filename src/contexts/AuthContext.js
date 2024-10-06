import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Tạo Auth context
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate(); // Thay đổi ở đây

  // Hàm đăng nhập
  const login = (token) => {
    setIsAuthenticated(true);
    localStorage.setItem('access_token', token); // Lưu token vào localStorage
  };

  // Hàm đăng xuất
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('access_token'); // Xóa token
    localStorage.removeItem('refresh_token'); // Xóa expired_at
    localStorage.removeItem('user_profile');
    localStorage.removeItem('expires_at');
     // Xóa expired_at
    navigate('/login'); // Chuyển hướng đến trang đăng nhập
  };

  // Hàm kiểm tra token khi người dùng vào lại trang
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setIsAuthenticated(true);
      // Giả sử fetch thông tin người dùng từ API
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
