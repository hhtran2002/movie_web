import React from 'react';
import '../styles/header.css';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="logo">LOGO</div>
      <nav className="nav">
        <Link to="/admin">Admin</Link>
        <Link to="/">Trang Chủ</Link>
        <Link to="/categories">Thể Loại</Link>
        <Link to="/series">Phim Bộ</Link>
        <Link to="/movies">Phim Lẻ</Link>

      </nav>
      <div className="search-bar">
        <input type="text" placeholder="Tìm kiếm..." />
        <button>🔍</button>
      </div>
      <div className="auth-buttons">
        <Link to="/login">
          <button className="login-btn-header">Đăng Nhập</button>
        </Link>
        <Link to="/register">
          <button className="register-btn-header">Đăng Ký</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;