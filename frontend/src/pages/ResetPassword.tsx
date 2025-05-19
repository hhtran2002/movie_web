import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../styles/resetPassword.css"; // Import CSS styles

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
    general: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "", general: "" });
    setMessage("");
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      password: "",
      confirmPassword: "",
      general: "",
    };

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Kiểm tra token và mật khẩu
    if (!validateForm() || !token) {
      setErrors((prev) => ({
        ...prev,
        general: "Token and password are required",
      }));
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newPassword: formData.password,
          token: token,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Password reset failed");
      }

      const data = await response.json();
      console.log("Password reset successful:", data);
      setMessage("Password reset successful!");
      setFormData({ password: "", confirmPassword: "" });

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error: any) {
      setErrors((prev) => ({
        ...prev,
        general: error.message || "An error occurred, please try again",
      }));
    }
  };

  return (
    <div className="reset-container">
      <h2>ĐẶT LẠI MẬT KHẨU</h2>
      {errors.general && <p className="error">{errors.general}</p>}
      {message && <p className="success">{message}</p>}
      <form className="reset-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Mật Khẩu Mới"
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <div className="form-group">
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            placeholder="Nhập Lại Mật Khẩu "
          />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
        </div>
        <button type="submit" className="reset-btn">
          ĐẶT LẠI
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
