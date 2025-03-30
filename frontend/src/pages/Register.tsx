import React, { useState } from 'react';
import '../styles/register.css';
import '../styles/login.css';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    birthDate: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <div className="register-container">
      <h2>ĐĂNG KÝ</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Họ Tên</label>
          <input id="fullName" type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="birthDate">Ngày sinh</label>
          <input id="birthDate" type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mật Khẩu</label>
          <input id="password" type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Xác Nhận Mật Khẩu</label>
          <input id="confirmPassword" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
        </div>
        <button type="submit">ĐĂNG KÝ</button>
      </form>
    </div>
  );
};

export default Register;
