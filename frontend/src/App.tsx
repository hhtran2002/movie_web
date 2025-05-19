
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './app.css';
import Header from './component/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Home from './pages/Home';

import MovieDetail from './pages/MovieDetail';
import Videoplayer from './pages/VideoPlayer';
import Admin from './pages/Admin';

import Account     from './pages/Account';
import History     from './pages/History';
import SearchResults from './component/SearchResults';
import Category from './component/Category';
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

        {/* Account & History */}
        <Route path="/account"         element={<Account />} />
        <Route path="/history"         element={<History />} />

        <Route path="/category/:slug" element={<Category />} />
        <Route path="/search" element={<SearchResults />} />
        {/* ADMIN phải có dấu * để cho phép nested route */}
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
    </div>
  );
};

export default App;
