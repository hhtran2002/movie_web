import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MovieAdmin from './MovieAdmin';
import AddMovie from '../component/AddMovie';
import AddEpisode from '../component/AddEpisode';

const Admin: React.FC = () => {
  return (
    <div style={{ display: 'flex' }}>

      <main style={{ flex: 1, padding: 20 }}>
        <Routes>
          {/* /admin → /admin/movies/list */}
          <Route index element={<Navigate to="movies/list" replace />} />

          <Route path="movies/list"   element={<MovieAdmin />} />
          <Route path="movies/add"    element={<AddMovie />} />
          <Route path="episodes/add"  element={<AddEpisode />} />

          {/* catch-all */}
          <Route path="*"            element={<Navigate to="movies/list" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default Admin;
