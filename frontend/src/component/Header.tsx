// src/components/Header.tsx
import React, { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaUser, FaHistory } from "react-icons/fa";
import "../styles/header.css";

const Header: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const query = searchTerm.trim();
    if (query) {
      // Điều hướng đến route search với query param
      navigate(`/search?query=${encodeURIComponent(query)}`);
      setSearchTerm("");
    }
  };

  return (
    <header className="header">

      <Link to="/" title="Trang Chủ">
        <FaHome size={30} className="nav-icon" />
      </Link>
      <Link to="/account" title="Tài Khoản">
        <FaUser size={30} className="nav-icon" />
      </Link>
      <Link to="/history" title="Lịch Sử">
        <FaHistory size={30} className="nav-icon" />
      </Link>
    


      {/* Search Form */}
      <form className="search-bar" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tìm kiếm phim..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">🔍</button>
      </form>

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
