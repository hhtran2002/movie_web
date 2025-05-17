// src/pages/SearchResults.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResults: React.FC = () => {
  const query = useQuery().get("query") || "";
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    if (!query) return;
    // fetch từ API của bạn, ví dụ:
    fetch(`http://localhost:5000/api/movies/search?query=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((data) => setResults(data))
      .catch(console.error);
  }, [query]);

  return (
    <div className="search-results">
      <h2>Kết quả tìm kiếm cho “{query}”</h2>
      {results.length === 0 ? (
        <p>Không tìm thấy phim nào.</p>
      ) : (
        <ul>
          {results.map((movie) => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;
