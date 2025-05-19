import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/category.css'; // bạn tự tạo CSS tương ứng

// 1. Định nghĩa interface phim
interface Movie {
  id: number;
  name: string;
  thumbnail: string;
  total_ep?: number;
}

const Category: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  // 2. State để lưu danh sách phim
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 3. Fetch khi slug thay đổi
  useEffect(() => {
    if (!slug) return;

    setIsLoading(true);
    fetch(`/api/movies/category/${slug}`)
      .then(res => {
        if (!res.ok) throw new Error(`Lỗi ${res.status}`);
        return res.json();
      })
      .then((data: Movie[]) => {
        setMovies(data);
        setError(null);
      })
      .catch(err => {
        console.error(err);
        setError('Không tải được dữ liệu phim.');
      })
      .finally(() => setIsLoading(false));
  }, [slug]);

  // 4. Hàm biến slug thành tiêu đề thân thiện
  const formatTitle = (s: string) =>
    s
      .split('-')
      .map(word => word[0].toUpperCase() + word.slice(1))
      .join(' ');

  return (
    <div className="category-container">
      <h1 className="category-title">
        Danh mục: {slug ? formatTitle(slug) : ''}
      </h1>

      {isLoading && <p>Đang tải phim...</p>}
      {error && <p className="error">{error}</p>}

      {!isLoading && !error && movies.length === 0 && (
        <p>Chưa có phim nào trong danh mục này.</p>
      )}

      {!isLoading && !error && movies.length > 0 && (
        <div className="movie-grid">
          {movies.map(movie => (
            <div
              key={movie.id}
              className="movie-card"
              onClick={() => navigate(`/movies/${movie.id}`)}
            >
              <img
                src={movie.thumbnail}
                alt={movie.name}
                className="movie-thumb"
              />
              <div className="movie-info">
                <h3 className="movie-name">{movie.name}</h3>
                {movie.total_ep && (
                  <span className="movie-ep">{movie.total_ep} tập</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Category;
