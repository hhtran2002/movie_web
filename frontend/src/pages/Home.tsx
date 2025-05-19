import React, {
  useState,
  useEffect,
  useMemo,
  Dispatch,
  ReactElement
} from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";

interface Movie {
  id: number;
  name: string;
  thumbnail: string;
  total_ep?: number;
}

// Hàm shuffle Fisher–Yates
function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const Home: React.FC = (): ReactElement => {
  const navigate = useNavigate();

  // Dữ liệu
  const [movies, setMovies] = useState<Movie[]>([]);
  const [phimBo, setPhimBo] = useState<Movie[]>([]);
  const [phimLe, setPhimLe] = useState<Movie[]>([]);

  // Slider
  const [sliderIndex, setSliderIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Loading state
  const [isLoading, setIsLoading] = useState(true);

  // Số item hiển thị tạm trên Home
  const VISIBLE_COUNT = 5;

  // Fetch toàn bộ để làm slider
  const fetchSlider = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/movies");
      if (!res.ok) throw new Error("Lỗi khi lấy dữ liệu slider");
      const data = await res.json();
      setMovies(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setMovies([]);
    }
  };

  // Fetch theo slug category
  const fetchCategory = async (
    slug: string,
    setter: Dispatch<React.SetStateAction<Movie[]>>
  ) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/movies/category/${encodeURIComponent(
          slug
        )}`
      );
      if (!res.ok) throw new Error(`Lỗi khi lấy danh mục ${slug}`);
      const data = await res.json();
      setter(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setter([]);
    }
  };

  // Load slider + 2 category
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await Promise.all([
        fetchSlider(),
        fetchCategory("Phim Bộ", setPhimBo),
        fetchCategory("Phim Lẻ", setPhimLe),
      ]);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  // Tạo mảng trending random mỗi khi `movies` thay đổi
  const trendingMovies = useMemo(() => {
    return shuffleArray(movies);
  }, [movies]);

  // Slider controls
  const nextSlide = () =>
    setSliderIndex((i) => (movies.length ? (i + 1) % movies.length : 0));
  const prevSlide = () =>
    setSliderIndex((i) =>
      movies.length ? (i - 1 + movies.length) % movies.length : 0
    );
  const handleUserInteraction = () => {
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };
  const goToSlide = (idx: number) => {
    setSliderIndex(idx);
    handleUserInteraction();
  };

  useEffect(() => {
    if (!isAutoPlaying || movies.length === 0) return;
    const iv = setInterval(nextSlide, 3000);
    return () => clearInterval(iv);
  }, [isAutoPlaying, movies.length]);

  if (isLoading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  // Cấu hình cho 3 section, lấy trendingMovies cho mục THỊNH HÀNH
  const sections = [
    { title: "THỊNH HÀNH", slug: "thinh-hanh", data: trendingMovies },
    { title: "PHIM BỘ", slug: "Phim Bộ", data: phimBo },
    { title: "PHIM LẺ", slug: "Phim Lẻ", data: phimLe },
  ];

  return (
    <div className="home-container">
      {/* Slider */}
      <div className="slider">
        <button
          className="prev-btn"
          onClick={() => {
            prevSlide();
            handleUserInteraction();
          }}
        >
          {"<"}
        </button>
        <div
          className="slider-container"
          style={
            { "--slider-offset": `${-sliderIndex * 100}%` } as React.CSSProperties
          }
        >
          {movies.map((m) => (
            <img
              key={m.id}
              src={m.thumbnail}
              alt={m.name}
              className="slider-image"
            />
          ))}
        </div>
        <button
          className="next-btn"
          onClick={() => {
            nextSlide();
            handleUserInteraction();
          }}
        >
          {">"}
        </button>
        <div className="slider-dots">
          {movies.map((_, idx) => (
            <span
              key={idx}
              className={`dot ${sliderIndex === idx ? "active" : ""}`}
              onClick={() => goToSlide(idx)}
            />
          ))}
        </div>
      </div>

      {/* Các section phim: Trending bây giờ random */}
      {sections.map(({ title, slug, data }) => (
        <div className="movie-section" key={slug}>
          <h2>{title}</h2>
          <div className="movie-list">
            {data.slice(0, VISIBLE_COUNT).map((m) => (
              <div
                key={m.id}
                className="movie-item"
                onClick={() => navigate(`/movies/${m.id}`)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={m.thumbnail}
                  alt={m.name}
                  className="movie-thumbnail"
                />
              </div>
            ))}
          </div>
          <button
            className="load-more-btn"
            onClick={() => navigate(`/category/${slug}`)}
          >
            Xem thêm
          </button>
        </div>
      ))}
    </div>
  );
};

export default Home;
