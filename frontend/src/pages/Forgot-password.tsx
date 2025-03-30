import React, { useState } from "react";
import "../styles/register.css"; // Dùng chung CSS với trang đăng ký

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");

  return (
    <div className="forgot-password-container">
      <h2>Quên Mật Khẩu</h2>
     
      <form>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Gửi Yêu Cầu</button>
      </form>
    </div>
  );
};

export default ForgotPassword;

