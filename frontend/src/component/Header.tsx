import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaHistory,
  FaSearch,
  FaBars,
  FaTimes
} from "react-icons/fa";
import "../styles/header.css";

const Header: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showHeader, setShowHeader] = useState(true);
  const [showToggle, setShowToggle] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchTerm.trim();
    if (query) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
      setSearchTerm("");
    }
  };

  // Hiện nút toggle khi cuộn hoặc màn hình nhỏ
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth <= 768 || window.scrollY > 50) {
        setShowToggle(true);
      } else {
        setShowToggle(false);
      }
    };

    handleScroll(); // chạy 1 lần lúc load

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll); // bắt cả resize

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Nút toggle */}
      {showToggle && (
        <button
          className="toggle-header-btn"
          onClick={() => setShowHeader(!showHeader)}
        >
          {showHeader ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      )}

      {/* Thanh header chính */}
      {showHeader && (
        <header className="header">
          <div className="nav-icons">
            <Link to="/" title="Trang Chủ" className="nav-link">
              <FaHome size={24} />
            </Link>
            <Link to="/account" title="Tài Khoản" className="nav-link">
              <FaUser size={24} />
            </Link>
            <Link to="/history" title="Lịch Sử" className="nav-link">
              <FaHistory size={24} />
            </Link>
          </div>

          <form className="search-bar" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Tìm kiếm phim..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="search-button"
              aria-label="Tìm kiếm"
            >
              <FaSearch />
            </button>
          </form>

          <div className="auth-buttons">
            <Link to="/login" className="auth-link">
              <button className="login-btn-header">Đăng Nhập</button>
            </Link>
            <Link to="/register" className="auth-link">
              <button className="register-btn-header">Đăng Ký</button>
            </Link>
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
