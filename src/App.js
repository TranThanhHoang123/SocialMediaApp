import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import ProtectedRoutes from "./utils/ProtectedRoute.js";
import AuthProvider from "./contexts/AuthContext.js";

// Các trang cần import
import HomePage from "./pages/Home.js";
import LoginPage from "./pages/Login.js";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Route công khai */}
          <Route path="/login" element={<LoginPage />} />

          {/* Route bảo vệ - yêu cầu đăng nhập */}
          <Route
            path="/"
            element={
              <ProtectedRoutes>
                <HomePage />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
