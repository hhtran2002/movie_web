
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './component/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/Forgot-password';
import ResetPassword from './pages/Reset-password';
import Home from './pages/Home';

import MovieDetail from './pages/MovieDetail';
import Videoplayer from './pages/Video-player';
import Admin from './pages/Admin';
import SearchResults from './pages/SearchResults';

import Account     from './pages/Account';
import History     from './pages/History';

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
        <Route path="/watch/:id" element={<Videoplayer />} />
        <Route path="/search/:keyword" element={<SearchResults />} />

        {/* Account & History */}
        <Route path="/account"         element={<Account />} />
        <Route path="/history"         element={<History />} />

        <Route path="/search" element={<SearchResults />} />
        {/* ADMIN phải có dấu * để cho phép nested route */}
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
    </div>
  );
};

export default App;
