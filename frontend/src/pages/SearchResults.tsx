
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/searchResults.css";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

interface Movie {
  id: number;
  name: string;
  description?: string;
  thumbnail?: string;
}

const SearchResults: React.FC = () => {
  const query = useQuery().get("query") || "";
  const [results, setResults] = useState<Movie[]>([]);

  useEffect(() => {
    if (query) {
      fetch(`/api/movies/search?query=${encodeURIComponent(query)}`)
        .then(res => {
          if (!res.ok) throw new Error("Kết nối không thành công");
          return res.json();
        })
        .then((data: Movie[]) => {
          console.log("Kết quả tìm kiếm:", data);
          setResults(data);
        })
        .catch(err => console.error("Lỗi khi tìm kiếm:", err));
    }
  }, [query]);

  return (
    <div className="search-results">
      <h2>Kết quả tìm kiếm cho “{query}”</h2>

      {results.length === 0 ? (
        <p>Không tìm thấy phim nào.</p>
      ) : (
        <div className="movie-list-search">
          {results.map((movie) => (
            <div key={movie.id} className="movie-card">
              <Link to={`/movies/${movie.id}`}>
                <img
                  src={movie.thumbnail || "/default.jpg"}
                  alt={movie.name}
                />
                <h3>{movie.name}</h3>
                <p>
                  {movie.description
                    ? `${movie.description.slice(0, 80)}…`
                    : "Không có mô tả."}
                </p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
