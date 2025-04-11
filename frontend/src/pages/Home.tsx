import React, { useState, useEffect } from "react";
import "../styles/home.css"; // Import file CSS
// import Header from "./Header";
// import Footer from "./Footer";

const Home: React.FC = () => {
  const movies = [
    { id: 1, image: "/images/movie1.png" },
    { id: 2, image: "/images/movie2.png" },
    { id: 3, image: "/images/movie3.png" },
    { id: 4, image: "/images/movie4.png" },
  ];

  const phimBo = [
    { id: 1, image: "/images/movie1.png" },
    { id: 2, image: "/images/movie2.png" },
    { id: 3, image: "/images/movie3.png" },
    { id: 4, image: "/images/movie4.png" },
  ];

  const phimLe = [
    { id: 1, image: "/images/movie1.png" },
    { id: 2, image: "/images/movie2.png" },
    { id: 3, image: "/images/movie3.png" },
    { id: 4, image: "/images/movie4.png" },
  ];

  const [sliderIndex, setSliderIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

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
    setTimeout(() => {
      setIsAutoPlaying(true);
    }, 5000); // Resume auto-scroll after 5 seconds
  };

  // Auto-scroll effect
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Auto-scroll every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [isAutoPlaying, nextSlide]);

  return (
    <div className="home-container">
      {/* <Header /> */}

      {/* Automatic Carousel / Image Slider */}
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
          style={{ transform: `translateX(-${sliderIndex * 100}%)` }}
        >
          {movies.map((movie) => (
            <img
              key={movie.id}
              src={movie.image}
              alt={`Slide ${movie.id}`}
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

        {/* Navigation Dots */}
        <div className="slider-dots">
          {movies.map((_, index) => (
            <span
              key={index}
              className={`dot ${sliderIndex === index ? "active" : ""}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>

      {/* Danh sách phim */}
      <div className="movie-section">
        <h2>THỊNH HÀNH</h2>
        <div className="movie-list">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-item">
              <img src={movie.image} alt="Phim" className="movie-thumbnail" />
            </div>
          ))}
        </div>
      </div>

      <div className="movie-section">
        <h2>PHIM BỘ</h2>
        <div className="movie-list">
          {phimBo.map((movie) => (
            <div key={movie.id} className="movie-item">
              <img src={movie.image} alt="Phim" className="movie-thumbnail" />
            </div>
          ))}
        </div>
      </div>

      <div className="movie-section">
        <h2>PHIM LẺ</h2>
        <div className="movie-list">
          {phimLe.map((movie) => (
            <div key={movie.id} className="movie-item">
              <img src={movie.image} alt="Phim" className="movie-thumbnail" />
            </div>
          ))}
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Home;