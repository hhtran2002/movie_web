import React, { useState } from "react";
import "../styles/register.css"; // Dùng chung CSS với trang đăng ký

const ForgotPassword: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    general: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "", general: "" });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      email: "",
      general: "",
    };

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
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
      // Gửi dữ liệu đến API (giả sử bạn có API quên mật khẩu)
      const response = await fetch("http://localhost:3000/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send password reset request");
      }

      const data = await response.json();
      console.log("Password reset request sent:", data);
      alert("Password reset request sent! Please check your email.");
    } catch (error) {
      // setErrors({ ...errors, general: error.message || "An error occurred, please try again" });
    }
  };

  return (
    <div className="register-container">
      <h2>FORGOT PASSWORD</h2>
      {errors.general && <p className="error">{errors.general}</p>}
      <form className="register-form" onSubmit={handleSubmit}>
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
        <button type="submit" className="register-btn">
          SEND REQUEST
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;