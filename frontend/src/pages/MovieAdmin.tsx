// src/pages/MovieAdmin.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/movieAdmin.css';

interface Movie {
  id: number;
  name: string;
  description: string;
  status: string;
  release_year: number;
  total_ep: number;
  trailer_url: string;
  thumbnail: string;
}

const MovieAdmin: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get<Movie[]>('/api/admin/movies');
        setMovies(res.data);
      } catch (err: any) {
        console.error('Lỗi khi fetch movies:', err.response?.data || err.message);
        alert('❌ Không lấy được danh sách phim.');
      }
    };
    fetchMovies();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Bạn có chắc muốn xóa phim này?')) return;
    try {
      await axios.delete(`/api/admin/movies/${id}`);
      setMovies((prev) => prev.filter((m) => m.id !== id));
    } catch (err: any) {
      console.error('Lỗi khi xóa phim:', err.response?.data || err.message);
      alert('❌ Xóa phim thất bại.');
    }
  };

  return (
    <div className="movie-admin-container">
      <div className="movie-admin-header">
        <h2>📋 Danh sách phim</h2>
        <button
          className="add-movie-btn"
          onClick={() => navigate('/admin/movies/add')}
        >
          ➕ Thêm phim
        </button>
      </div>

      <table className="movie-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên phim</th>
            <th>Năm</th>
            <th>Tổng tập</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((m) => (
            <tr key={m.id}>
              <td>{m.id}</td>
              <td>{m.name}</td>
              <td>{m.release_year}</td>
              <td>{m.total_ep}</td>
              <td>
                <div className="action-buttons">
                  <button
                    className="add-episode-btn"
                    onClick={() =>
                      navigate(`/admin/episodes/add?movieId=${m.id}`)
                    }
                  >
                    ➕ Tập phim
                  </button>
                  <button
                    className="delete-movie-btn"
                    onClick={() => handleDelete(m.id)}
                  >
                    🗑️ Xóa
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {movies.length === 0 && (
            <tr>
              <td colSpan={5} style={{ textAlign: 'center', padding: 16 }}>
                Không có phim nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MovieAdmin;
