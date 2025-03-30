import React, { useState } from "react";
import "../styles/home.css"; // Import file CSS
import Header from "./Header";
import Footer from "./Footer";

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

  const nextSlide = () => setSliderIndex((prev) => (prev + 1) % movies.length);
  const prevSlide = () => setSliderIndex((prev) => (prev - 1 + movies.length) % movies.length);

  return (
    <div className="home-container">
      <Header />

      {/* Phần Slider */}
      <div className="slider">
        <button className="prev-btn" onClick={prevSlide}>{"<"}</button>
        <img src={movies[sliderIndex].image} alt="Slider" className="slider-image" />
        <button className="next-btn" onClick={nextSlide}>{">"}</button>
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
      <Footer/>
    </div>
  );
};

export default Home;
