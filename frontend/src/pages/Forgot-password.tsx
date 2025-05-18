import React, { useState } from "react";
import "../styles/register.css"; // Dùng chung CSS với trang đăng ký

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
    if (!validateForm()) return;

    try {
      const response = await fetch("http://localhost:5000/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Failed to send password reset request");
      }

      setMessage("Password reset request sent! Please check your email.");
      setFormData({ email: "" });
    } catch (error: any) {
      setErrors((prev) => ({
        ...prev,
        general: error.message || "An error occurred, please try again",
      }));
    }
  };

  return (
    <div className="register-container">
      <h2>FORGOT PASSWORD</h2>
      {errors.general && <p className="error">{errors.general}</p>}
      {message && <p className="success">{message}</p>}
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
