import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/adminsidebar.css';

const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState({
    phim: false,
    user: false,
    theLoai: false,
    video: false,
  });

  const toggleMenu = (menu: keyof typeof openMenus) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo">📽 MOVIE</div>
      </div>

      <ul className="sidebar-menu">
        <li>
          <div onClick={() => toggleMenu('phim')} className="menu-item">
            🎞️ Quản lý phim {openMenus.phim ? '▾' : '▸'}
          </div>
          {openMenus.phim && (
            <ul className="submenu">
              <li>
                <Link to="/movies/add">➕ Thêm phim</Link>
              </li>
              <li>
                <Link to="/movies/list">📄 Liệt kê phim</Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <div onClick={() => toggleMenu('user')} className="menu-item">
            📁 Quản lý USER {openMenus.user ? '▾' : '▸'}
          </div>
          {openMenus.user && (
            <ul className="submenu">
              <li>
                <Link to="/users/comments">💬 Quản lý bình luận</Link>
              </li>
              <li>
                <Link to="/users/accounts">👤 Quản lý tài khoản</Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <div onClick={() => toggleMenu('video')} className="menu-item">
            🌍 Quản lý video {openMenus.video ? '▾' : '▸'}
          </div>
          {openMenus.video && (
            <ul className="submenu">
              <li>
                <Link to="/videos/add">➕ Thêm video</Link>
              </li>
              <li>
                <Link to="/videos/list">📄 Danh sách video</Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;