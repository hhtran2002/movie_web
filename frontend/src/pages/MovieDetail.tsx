import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/moviedetail.css";

interface Country {
  id: number;
  name: string;
}

interface Episode {
  id: number;
  movie: { id: number };
  ep_number: number;
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

const extractYouTubeId = (url: string): string => {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : "";
};

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
        const res = await fetch(`http://localhost:5000/api/movies/details/${id}`);
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
    <div className="movie-detail-container">
      {/* Phần nội dung chính chia thành hai cột */}
      <div className="movie-detail">
        <div className="top-section">
          {/* Cột trái: Poster phim */}
          <div className="movie-poster">
            <img
              src={movie.thumbnail}
              alt={movie.name}
              loading="lazy"
              onError={(e) => (e.currentTarget.src = "path/to/placeholder-image.jpg")}
            />
          </div>

          {/* Cột phải: Thông tin phim và danh sách tập phim */}
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

            {/* Nút xem phim */}
            <div className="watch-button-container">
              <Link to={`/watch/${movie.id}`} className="watch-button">
                🎬 Xem phim
              </Link>
            </div>

            {/* Danh sách tập phim */}
           
          </div>
        </div>
      </div>

      {/* Phần trailer riêng, trải rộng toàn màn hình */}
      <div className="trailer-section">
        <h2 style={{ color: 'white', marginBottom: '10px' }}>Trailer</h2>
        <div className="movie-trailer">
          <iframe
            width="100%"
            height="450"
            src={`https://www.youtube.com/embed/${extractYouTubeId(movie.trailer_url)}`}
            title="Trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
