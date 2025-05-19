import React, { useState } from "react";
import "../styles/forgotPassword.css"; 

const ForgotPassword: React.FC = () => {
  const [formData, setFormData] = useState({ email: "" });
  const [errors, setErrors] = useState({ email: "", general: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "", general: "" });
    setMessage(""); // Reset message khi user gõ lại
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", general: "" };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Vui lòng nhập email";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email không đúng định dạng";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch("http://localhost:5000/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Gửi yêu cầu thất bại");
      }

      setMessage("Yêu cầu đặt lại mật khẩu đã được gửi! Vui lòng kiểm tra email của bạn.");
      setFormData({ email: "" });
    } catch (error: any) {
      setErrors((prev) => ({
        ...prev,
        general: error.message || "Đã xảy ra lỗi, vui lòng thử lại.",
      }));
    }
  };

  return (
    <div className="forgot-container">
    <h2>QUÊN MẬT KHẨU</h2>
    {errors.general && <p className="error">{errors.general}</p>}
    {message && <p className="success">{message}</p>}
    <form className="forgot-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Nhập email của bạn"
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>
      <button type="submit" className="forgot-btn">
        GỬI YÊU CẦU
      </button>
    </form>
  </div>

  );
};

export default ForgotPassword;
