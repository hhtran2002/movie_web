"use client"

import React, { useState, type FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FaHome, FaUser, FaHistory, FaSearch } from "react-icons/fa"
import "../styles/header.css"

const Header: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const query = searchTerm.trim()
    if (query) {
      navigate(`/search?query=${encodeURIComponent(query)}`)
      setSearchTerm("")
    }
  }

  return (
    <header className="header">
      {/* Biểu tượng bên trái */}
      <div className="nav-icons">
        <Link to="/" title="Trang Chủ" className="nav-link">
          <FaHome size={24} className="nav-icon" />
        </Link>
        <Link to="/account" title="Tài Khoản" className="nav-link">
          <FaUser size={24} className="nav-icon" />
        </Link>
        <Link to="/history" title="Lịch Sử" className="nav-link">
          <FaHistory size={24} className="nav-icon" />
        </Link>
      </div>

      {/* Thanh tìm kiếm */}
      <form className="search-bar" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tìm kiếm phim..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="search-button" aria-label="Tìm kiếm">
          <FaSearch />
        </button>
      </form>

      {/* Nút đăng nhập / đăng ký */}
      <div className="auth-buttons">
        <Link to="/login" className="auth-link">
          <button type="button" className="login-btn-header">Đăng Nhập</button>
        </Link>
        <Link to="/register" className="auth-link">
          <button type="button" className="register-btn-header">Đăng Ký</button>
        </Link>
      </div>
    </header>
  )
}

export default Header
