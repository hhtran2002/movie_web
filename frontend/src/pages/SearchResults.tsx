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
      try {
        const res = await fetch(`http://localhost:5000/api/movies/search/${encodeURIComponent(keyword || '')}`);
        const data = await res.json();
        setMovies(data);
      } catch (error) {
        console.error('Lỗi khi tìm phim:', error);
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
