import { Routes, Route, Navigate } from 'react-router-dom';
import MovieAdmin from './MovieAdmin';
import AddEpisode from './AddEpisode';
import AddMovie from './AddMovie';

const Admin = () => {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1, padding: '20px' }}>
        <Routes>
          <Route index element={<Navigate to="movies/list" />} />
          <Route path="movies/list" element={<MovieAdmin />} />
          <Route path="episodes/add" element={<AddEpisode />} />
          <Route path="movies/add" element={<AddMovie />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;