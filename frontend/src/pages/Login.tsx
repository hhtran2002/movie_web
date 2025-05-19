// src/pages/Login.tsx
import React, { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // 1. Nếu là admin tĩnh thì bỏ qua API, set token và chuyển hướng luôn
    if (email === 'admin@gmail.com' && password === 'admin') {
      // bạn có thể set 1 giá trị token bất kỳ hoặc thông tin role
      localStorage.setItem('token', 'admin-token');
      alert('Đăng nhập thành công với quyền Admin!');
      navigate('/admin');
      return;
    }

    // 2. Còn lại thì gọi API như bình thường
    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      const data = response.data as { token: string };
      localStorage.setItem('token', data.token);
      alert('Đăng nhập thành công!');
      navigate('/account');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Đăng nhập thất bại');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h3>ĐĂNG NHẬP</h3>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Mật Khẩu"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <Link to="/forgot-password" className="forgot-password">
            Quên mật khẩu?
          </Link>
          <button type="submit" className="sign-in-btn">
            ĐĂNG NHẬP
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
