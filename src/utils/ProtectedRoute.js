// ProtectedRoute.js
import React, { useEffect, useState } from "react";
import fetchUserProfile from "../services/profileService";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserProfile = async () => {
      console.log("Protected routes");
      const response = await fetchUserProfile();
      setIsAuthenticated(response.success); 
      setLoading(false);
    };

    checkUserProfile();
  }, []); // Đảm bảo useEffect chỉ chạy một lần

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoutes;

