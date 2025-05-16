import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/movieadmin.css";

const MovieAdmin = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/movies");
      setMovies(res.data as any[]);
      setError(null);
    } catch (err: any) {
      console.error("Lỗi khi tải danh sách phim:", err);
      setError("Không thể tải danh sách phim. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Bạn có chắc muốn xóa phim này?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/movies/${id}`);
      setMovies((prev) => prev.filter((movie) => movie.id !== id));
      alert("✅ Xóa phim thành công");
    } catch (err: any) {
      console.error("Lỗi khi xóa phim:", err.response?.data || err);
      alert(`❌ Xóa thất bại: ${err.response?.data?.message || "Lỗi server"}`);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  if (loading) return <p>Đang tải danh sách phim...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="movie-list">
      <table className="movie-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên phim</th>
            <th>Thể loại</th>
            <th>Số tập</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id}>
              <td>{movie.id}</td>
              <td>{movie.name}</td>
              <td>{movie.genres?.map((g: any) => g.name).join(", ") || "Chưa có"}</td>
              <td>{movie.total_ep}</td>
              <td>
                <Link to={`../../episodes/add?movieId=${movie.id}`} className="add-ep-btn">
                  ➕ Tập phim
                </Link>
                <button className="delete-btn" onClick={() => handleDelete(movie.id)}>
                  🗑️ Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="add-movie-container">
        <Link to="../../movies/add" className="add-movie-btn">➕ Thêm phim</Link>
      </div>
    </div>
  );
};

export default MovieAdmin;