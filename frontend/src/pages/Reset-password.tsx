import React, { useState } from "react";
import "../styles/register.css"; // Dùng chung CSS với trang đăng ký

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="reset-password-container">
      <h2>Đặt Lại Mật Khẩu</h2>

      <form>
        <div className="form-group">
          <label htmlFor="password">Mật Khẩu</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Xác Nhận Mật Khẩu</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Đặt Lại</button>
      </form>
    </div>
  );
};

export default ResetPassword;
