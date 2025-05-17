import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/SearchResults.css';

interface Movie {
  id: number;
  name: string;
  thumbnail: string;
  description: string;
  release_year: number;
}

const SearchResults: React.FC = () => {
  const { keyword } = useParams<{ keyword: string }>();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);

      try {
        // Nếu bạn đã config "proxy" trong package.json (CRA/Vite),
        // chỉ cần fetch đến /api/movies/search...
        const res = await fetch(
          `/api/movies/search?query=${encodeURIComponent(keyword || '')}`
        );

        if (!res.ok) {
          console.error('Fetch lỗi:', res.status, res.statusText);
          setMovies([]);
        } else {
          const data: Movie[] = await res.json();
          setMovies(data);
        }
      } catch (err) {
        console.error('Lỗi khi tìm phim:', err);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [keyword]);

  return (
    <div className="search-results">
      <h2>Kết quả tìm kiếm cho: "{keyword}"</h2>

      {loading ? (
        <p>Đang tải...</p>
      ) : movies.length === 0 ? (
        <p>Không tìm thấy phim nào.</p>
      ) : (
        <div className="movie-list-search">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <Link to={`/movies/${movie.id}`}>
                <img src={movie.thumbnail} alt={movie.name} />
                <h3>{movie.name}</h3>
                <p>{movie.description}</p>
                <p>Năm phát hành: {movie.release_year}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
