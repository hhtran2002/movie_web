import React, { useState, useEffect } from "react";
import "../styles/home.css"; // Import file CSS
import { useNavigate } from "react-router-dom";

// import Header from "./Header";
// import Footer from "./Footer";

interface Movie {
  id: number;
  name: string;
  thumbnail: string;

}
const Home: React.FC = () => {
  // const movies = [
  //   { id: 1, image: "/images/movie1.png" },
  //   { id: 2, image: "/images/movie2.png" },
  //   { id: 3, image: "/images/movie3.png" },
  //   { id: 4, image: "/images/movie4.png" },
  // ];

  // const phimBo = [
  //   { id: 1, image: "/images/movie1.png" },
  //   { id: 2, image: "/images/movie2.png" },
  //   { id: 3, image: "/images/movie3.png" },
  //   { id: 4, image: "/images/movie4.png" },
  // ];

  // const phimLe = [
  //   { id: 1, image: "/images/movie1.png" },
  //   { id: 2, image: "/images/movie2.png" },
  //   { id: 3, image: "/images/movie3.png" },
  //   { id: 4, image: "/images/movie4.png" },
  // ];

  // const [sliderIndex, setSliderIndex] = useState(0);
  // const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const navigate = useNavigate();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [phimBo, setPhimBo] = useState<Movie[]>([]);
  const [phimLe, setPhimLe] = useState<Movie[]>([]);
  // const [thinhHanh, setThinhHanh] = useState<Movie[]>([]);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSlider = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/movies");
        if (!res.ok) throw new Error("Lỗi khi lấy phim slider");
        const data = await res.json();
        setMovies(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Lỗi khi lấy phim slider:", error);
        setMovies([]);
      }
    };

    const fetchCategory = async (category: string, setter: React.Dispatch<React.SetStateAction<Movie[]>>) => {
      try {
        const res = await fetch(`http://localhost:5000/api/movies/category/${encodeURIComponent(category)}`);
        if (!res.ok) throw new Error(`Lỗi khi lấy phim ${category}`);
        const data = await res.json();
        setter(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(`Lỗi khi lấy phim ${category}:`, error);
        setter([]);
      }
    };

    const fetchData = async () => {
      setIsLoading(true);
      await Promise.all([
        fetchSlider(),
        fetchCategory("Phim bộ", setPhimBo),
        fetchCategory("Phim lẻ", setPhimLe),
      ]);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  // Function to go to the next slide
  const nextSlide = () => {
    setSliderIndex((prev) => (prev + 1) % movies.length);
  };

  // Function to go to the previous slide
  const prevSlide = () => {
    setSliderIndex((prev) => (prev - 1 + movies.length) % movies.length);
  };

  // Function to go to a specific slide (for dots)
  const goToSlide = (index: number) => {
    setSliderIndex(index);
    handleUserInteraction();
  };

  // Pause auto-scroll on user interaction
  const handleUserInteraction = () => {
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
    
  };

  useEffect(() => {
    if (!isAutoPlaying || movies.length === 0) return;
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, movies.length]);

  // Sử dụng isLoading để hiển thị trạng thái loading
  if (isLoading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  return (
    <div className="home-container">
      <div className="slider">
        <button className="prev-btn" onClick={() => { prevSlide(); handleUserInteraction(); }}>
          {"<"}
        </button>
        <div
          className="slider-container"
          style={{ "--slider-offset": `${-sliderIndex * 100}%` } as React.CSSProperties}
        >
          {movies.length > 0 ? (
            movies.map((movie) => (
              <img
                key={movie.id}
                src={movie.thumbnail}
                alt={`Slide ${movie.id}`}
                className="slider-image"
              />
            ))
          ) : (
            <div>Không có phim để hiển thị</div>
          )}
        </div>
        <button className="next-btn" onClick={() => { nextSlide(); handleUserInteraction(); }}>
          {">"}
        </button>
        <div className="slider-dots">
          {movies.length > 0 &&
            movies.map((_, index) => (
              <span
                key={index}
                className={`dot ${sliderIndex === index ? "active" : ""}`}
                onClick={() => goToSlide(index)}
              />
            ))}
        </div>
      </div>

      <div className="movie-section">
        <h2>THỊNH HÀNH</h2>
        <div className="movie-list">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div key={movie.id} className="movie-item" onClick={() => navigate(`/movies/${movie.id}`)} style={{ cursor: "pointer" }}>
                <img src={movie.thumbnail} alt="Phim" className="movie-thumbnail" />
              </div>
            ))
          ) : (
            <div>Không có phim thịnh hành</div>
          )}
        </div>
      </div>


      <div className="movie-section">
        <h2>PHIM BỘ</h2>
        <div className="movie-list">
          {phimBo.length > 0 ? (
            phimBo.map((movie) => (
              <div key={movie.id} className="movie-item">
                <img src={movie.thumbnail} alt="Phim" className="movie-thumbnail" />
              </div>
            ))
          ) : (
            <div>Không có phim bộ</div>
          )}
        </div>
      </div>

      <div className="movie-section">
        <h2>PHIM LẺ</h2>
        <div className="movie-list">
          {phimLe.length > 0 ? (
            phimLe.map((movie) => (
              <div key={movie.id} className="movie-item">
                <img src={movie.thumbnail} alt="Phim" className="movie-thumbnail" />
              </div>
            ))
          ) : (
            <div>Không có phim lẻ</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;