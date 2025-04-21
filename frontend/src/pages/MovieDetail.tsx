import { useParams , Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/moviedetail.css";
import star_icon from '/images/star_icon.png';

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
    <div className="movie-detail" >
      <div className="top-section">
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
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            5/5 (122)
          </p>
          <div className="watch-button-container">
          <Link to={`/watch/${movie.id}`} className="watch-button">
            🎬 Xem phim
          </Link>
        </div>
        </div>
      </div>
      <div className="movie-trailer">
      <h2 style={{ color: 'white', marginBottom: '10px' }}>Trailer</h2>
        <iframe
          width="100%"
          height="650"
          src={`https://www.youtube.com/embed/${extractYouTubeId(movie.trailer_url)}`}
          title="Trailer"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      </div>
      
  );
};

export default MovieDetail;