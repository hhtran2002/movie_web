import React, { useState, useEffect } from "react";
import "../styles/home.css";
import { useNavigate } from "react-router-dom";


interface Movie {
  id: number;
  name: string;
  thumbnail: string;
  total_ep: number

}
const Home: React.FC = () => {
 
  const navigate = useNavigate();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [phimBo, setPhimBo] = useState<Movie[]>([]);
  const [phimLe, setPhimLe] = useState<Movie[]>([]);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleTrending, setVisibleTrending] = useState(5);
  const [visiblePhimBo, setVisiblePhimBo] = useState(5);
  const [visiblePhimLe, setVisiblePhimLe] = useState(5);



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
        fetchCategory("Phim Bộ", setPhimBo),
        fetchCategory("Phim Lẻ", setPhimLe),
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
    {movies.slice(0, visibleTrending).map((movie) => (
      <div key={movie.id} className="movie-item" onClick={() => navigate(`/movies/${movie.id}`)} style={{ cursor: "pointer" }}>
        <img src={movie.thumbnail} alt="Phim" className="movie-thumbnail" />
      </div>
    ))}
  </div>
  {visibleTrending < movies.length && (
    <button onClick={() => setVisibleTrending((prev) => prev + 6)} className="load-more-btn">
      Xem thêm
    </button>
  )}
</div>



      <div className="movie-section">
  <h2>PHIM BỘ</h2>
  <div className="movie-list">
    {phimBo.slice(0, visiblePhimBo).map((movie) => (
      <div key={movie.id} className="movie-item" onClick={() => navigate(`/movies/${movie.id}`)} style={{ cursor: "pointer" }}>
        <img src={movie.thumbnail} alt="Phim" className="movie-thumbnail" />
      </div>
    ))}
  </div>
  {visiblePhimBo < phimBo.length && (
    <button onClick={() => setVisiblePhimBo((prev) => prev + 6)} className="load-more-btn">
      Xem thêm
    </button>
  )}
</div>


      <div className="movie-section">
  <h2>PHIM LẺ</h2>
  <div className="movie-list">
    {phimLe.slice(0, visiblePhimLe).map((movie) => (
      <div key={movie.id} className="movie-item" onClick={() => navigate(`/movies/${movie.id}`)} style={{ cursor: "pointer" }}>
        <img src={movie.thumbnail} alt="Phim" className="movie-thumbnail" />
      </div>
    ))}
  </div>
  {visiblePhimLe < phimLe.length && (
    <button onClick={() => setVisiblePhimLe((prev) => prev + 6)} className="load-more-btn">
      Xem thêm
    </button>
  )}
</div>
    </div>
  );
};

export default Home;