import React from "react";
import "../styles/header.css";
const Header: React.FC = () => {
  return (
    <header className="header">
      {/* Logo */}
      <div className="logo">LOGO</div>

      {/* Menu */}
      <nav className="nav">
        <a href="#">Trang Chủ</a>
        <a href="#">Thể Loại</a>
        <a href="#">Phim Bộ</a>
        <a href="#">Phim Lẻ</a>
      </nav>

      {/* Search Bar */}
      <div className="search-bar">
        <input type="text" placeholder="Tìm kiếm..." />
        <button>🔍</button>
      </div>

      {/* Đăng nhập & Đăng ký */}
      <div className="auth-buttons">
        <button className="login-btn">Đăng Nhập</button>
        <button className="register-btn">Đăng Ký</button>
      </div>
    </header>
  );
};

export default Header;
