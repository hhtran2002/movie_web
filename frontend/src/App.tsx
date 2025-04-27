import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './component/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/Forgot-password';
import ResetPassword from './pages/Reset-password';
import Home from './pages/Home';
import Footer from './component/Footer';
import MovieDetail from './pages/MovieDetail';
import Videoplayer from './pages/Video-player';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/movies/:id" element={<MovieDetail />} /> {/* Chi tiết phim */}
        <Route path="/watch/:id" element={<Videoplayer />} />
 {/* Xem phim */}
      </Routes>
      <Footer />

        {/* <Route path="/movies/:id" element={<MovieDetail />} />   */}
        {/* <Route path="/watch/:id" element={<Videoplayer />} />
      </Routes>
      <Footer/> */}
      

    </div>
  );
};

export default App;
