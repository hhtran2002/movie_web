import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/moviedetail.css";

interface Episode {
  id: number;
  movie: { id: number };
  ep_number: number;
}

interface Country {
  id: number;
  name: string;
}

interface Movie {
  id: number;
  name: string;
  description: string;
  status: string;
  release_year: number;
  total_ep: number;
  thumbnail: string;
  trailer_url: string;
  average_rating?: number;
  countries?: Country[];
  episodes?: Episode[];
}

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`http://localhost:5000/api/movies/${id}`);
        if (!res.ok) throw new Error("Không thể tải thông tin phim");
        const data = await res.json();
        setMovie(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Đã xảy ra lỗi");
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  if (loading) return <div className="loading">Đang tải thông tin phim...</div>;
  if (error) return <div className="error">Lỗi: {error}</div>;
  if (!movie) return <div className="not-found">Không tìm thấy phim</div>;

  return (
    <div className="movie-detail">
      <div className="movie-poster">
        <img
          src={movie.thumbnail}
          alt={movie.name}
          loading="lazy"
          onError={(e) => (e.currentTarget.src = "path/to/placeholder-image.jpg")}
        />
      </div>
      <div className="movie-info">
        <h1>{movie.name}</h1>
        <p><strong>Mô tả:</strong> {movie.description}</p>
        <p><strong>Năm phát hành:</strong> {movie.release_year}</p>
        <p><strong>Tổng số tập:</strong> {movie.total_ep}</p>
        <p>
          <strong>Quốc gia:</strong>{" "}
          {movie.countries && movie.countries.length > 0
            ? movie.countries.map((country) => country.name).join(", ")
            : "Không xác định"}
        </p>
        <p>
          <strong>Điểm trung bình:</strong>{" "}
          {movie.average_rating ? movie.average_rating.toFixed(1) : "Chưa có đánh giá"}
        </p>
        <p>
          <strong>Trailer:</strong>{" "}
          <a href={movie.trailer_url} target="_blank" rel="noopener noreferrer">
            Xem trailer
          </a>
        </p>
      </div>
    </div>
  );
};

export default MovieDetail;