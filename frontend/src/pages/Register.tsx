import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/register.css";

const Register: React.FC = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    general: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "", general: "" });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      general: "",
    };

    // Kiểm tra họ tên
    if (!formData.name.trim()) {
      newErrors.name = "Họ tên không được để trống";
      isValid = false;
    }

    // Kiểm tra email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email không được để trống";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
      isValid = false;
    }

    // Kiểm tra số điện thoại
    if (!formData.phone.trim()) {
      newErrors.phone = "Số điện thoại không được để trống";
      isValid = false;
    } else if (!/^\d{10,11}$/.test(formData.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ";
      isValid = false;
    }

    // Kiểm tra mật khẩu
    if (!formData.password) {
      newErrors.password = "Mật khẩu không được để trống";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
      isValid = false;
    }

    // Kiểm tra xác nhận mật khẩu
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errRes = await response.json();
        throw new Error(errRes.message || "Đăng ký thất bại");
      }

      const data = await response.json();
      console.log("Đăng ký thành công:", data);
      alert("Đăng ký thành công!");

      navigate("/login");
    } catch (error: any) {
      setErrors((prev) => ({
        ...prev,
        general: error.message || "Có lỗi xảy ra, vui lòng thử lại",
      }));
    }
  };

  return (
    <div className="register-container">
      <h2>ĐĂNG KÝ</h2>
      {errors.general && <p className="error">{errors.general}</p>}
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Họ Tên</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="phone">Số điện thoại</label>
          <input
            id="phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            pattern="\d{10,11}"
            placeholder="Nhập số điện thoại"
          />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Mật Khẩu</label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Xác Nhận Mật Khẩu</label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
        </div>
        <button type="submit" className="register-btn">
          ĐĂNG KÝ
        </button>
      </form>
    </div>
  );
};

export default Register;
