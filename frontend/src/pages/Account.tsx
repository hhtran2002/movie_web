import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';        // ← import Link
import axios from 'axios';
import '../styles/Account.css';

interface UserInfo {
  id: number;
  username: string;
  email: string;
  createdAt: string;
}

const Account: React.FC = () => {
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
const token = localStorage.getItem('token'); // or your preferred storage/retrieval method
axios.get<{ user: UserInfo }>("http://localhost:5000/api/user/account", {
  headers: { Authorization: `Bearer ${token}` }
})
  .then(res => setUser(res.data.user))
  .catch(err => {
    console.error(err);
    alert('❌ Không tải được thông tin tài khoản.');
  });

    // axios
    //   .get<{ user: UserInfo }>('/account')
    //   .then(res => setUser(res.data.user))
    //   .catch(err => {
    //     console.error(err);
    //     alert('❌ Không tải được thông tin tài khoản.');
    //   });
  }, []);

  if (!user) return <div className="account-container">Đang tải...</div>;

  return (
    <div className="account-container">
      <h2>👤 Thông tin tài khoản</h2>
      <div className="account-info">
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        
      </div>

      {/* Nút dẫn đến lịch sử xem phim */}
      <div className="account-actions">
        <Link to="/history" className="history-button">
          🕒 Xem lịch sử xem phim
        </Link>
      </div>
    </div>
  );
};

export default Account;
