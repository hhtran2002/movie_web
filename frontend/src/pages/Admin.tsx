import { Routes, Route, Navigate } from 'react-router-dom';
import MovieAdmin from './MovieAdmin';
import UserAdmin from './UserAdmin';
import Sidebar from '../component/Sidebar';

const Admin = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '20px' }}>
        <Routes>
          {/* Điều hướng nếu vào /admin */}
          <Route index element={<Navigate to="movies/list" />} />
          
          {/* Các trang con */}
          <Route path="movies/list" element={<MovieAdmin />} />
          <Route path="users/accounts" element={<UserAdmin />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
