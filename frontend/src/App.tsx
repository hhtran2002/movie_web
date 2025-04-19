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
import Videoplayer from './pages/Video-player'

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
        <Route path="/movies/:id" element={<MovieDetail />} />  
       
      </Routes>
      {/* <Footer/> */}
      {/* <Videoplayer/> */}
      
    </div>
  );
};webkitURL

export default App;