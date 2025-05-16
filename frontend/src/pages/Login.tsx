import React, { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate(); // dùng để chuyển hướng sau khi login

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password
      });
      
      const data = response.data as { token: string };
      localStorage.setItem('token', data.token);
      

      alert('Đăng nhập thành công!');
      navigate('/profile'); // chuyển hướng về trang chủ hoặc dashboard

    } catch (error: any) {
      alert(error.response?.data?.message || 'Đăng nhập thất bại');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h3>Sign In</h3>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Link to="/forgot-password" className="forgot-password">
            Forgot Password?
          </Link>
          <button type="submit" className="sign-in-btn">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
