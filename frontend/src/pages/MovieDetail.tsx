import React from 'react';
import '../styles/moviedetail.css';
import Header from "../component/Header";

const MovieDetail: React.FC = () => {
  return (
    <section className="movie-detail">

      <div>
      <Header/>
      </div>
     
     
      <div className="movie-poster">
        <img src="/images/movie1.png" alt="Movie Poster" />
      </div>
      <div className="movie-info">
        <h1>QUÝ NỮ (KHÍ CHIM NHẠN TRỢ VẺ)</h1>
        <p>Tập 14 • Vietsub</p>
        <p>2025 • Trung Quốc</p>
        <div className="rating">
          <span>★★★★★</span> 3.9/5 (122 lượt đánh giá)
        </div>
        <p>Phim Chính kịch</p>
      </div>
    </section>
  );
};

export default MovieDetail;