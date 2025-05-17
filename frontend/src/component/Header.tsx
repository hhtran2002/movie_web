import React, { useState, useEffect, useRef } from 'react';
import '../styles/header.css';
import { Link, useNavigate } from 'react-router-dom';

interface Suggestion {
  id: number;
  name: string;
  description: string;
}

const Header: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSelect = (id: number) => {
    navigate(`/movies/${id}`);
    setSearchTerm('');
    setSuggestions([]);
  };

  const handleClick = () => {
    if (searchTerm.trim() !== '') {
      navigate(`/search/${encodeURIComponent(searchTerm)}`);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (searchTerm.trim() !== '') {
        try {
          const response = await fetch(`http://localhost:5000/api/movies/search/${encodeURIComponent(searchTerm)}`);
          const data: Suggestion[] = await response.json();
          setSuggestions(data);
        } catch (error) {
          console.error('Lỗi khi tìm kiếm:', error);
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSuggestions([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <div className="logo">LOGO</div>
      <nav className="nav">
        <Link to="/admin">Admin</Link>
        <Link to="/">Trang Chủ</Link>
      </nav>
      <div className="search-bar" ref={searchRef}>
        <input
          type="text"
          placeholder="Tìm kiếm..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <button onClick={handleClick} type="submit">🔍</button>
        {suggestions.length > 0 && (
          <ul className="suggestions">
            {suggestions.map((item) => (
              <li key={item.id} onClick={() => handleSelect(item.id)}>
                <div><strong>{item.name}</strong></div>
                <div>{item.description}</div>
              </li>
            ))}
          </ul>
        )}
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
