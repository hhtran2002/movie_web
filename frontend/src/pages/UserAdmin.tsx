
import '../styles/useradmin.css';

const UsersList = () => {
  const users = [
    { id: 1, username: "john_doe", email: "john@example.com", role: "Admin" },
    { id: 2, username: "jane_smith", email: "jane@example.com", role: "User" },
  ];

  return (
    <div className="user-list">
      <h1>👤 Danh sách Người dùng</h1>
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tài khoản</th>
            <th>Email</th>
            <th>Phân quyền</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button className="edit-btn">Sửa</button>
                <button className="delete-btn">Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
