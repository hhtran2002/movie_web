import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/addMovie.css";

const AddMovie = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    status: "Đang chiếu",
    release_year: new Date().getFullYear().toString(),
    total_ep: "1",
    thumbnail: "",
    trailer_url: "",
    genres: [] as string[],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/admin/movies', {
        ...form,
        release_year: Number(form.release_year),
        total_ep: Number(form.total_ep),
      });
      alert("Thêm phim thành công");
      navigate("/admin/movies/list");
    } catch (err: any) {
      console.error("Lỗi khi thêm phim:", err.response?.data || err.message);
      alert(`Lỗi khi thêm phim: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div className="add-movie-container">
      <h2>THÊM PHIM MỚI</h2>
      <form onSubmit={handleSubmit} className="add-movie-form">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Tên phim"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Mô tả phim"
          required
        />
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="Đang chiếu">Đang chiếu</option>
          <option value="Hoàn tất">Hoàn tất</option>
        </select>
        <input
          name="release_year"
          type="number"
          value={form.release_year}
          onChange={handleChange}
          placeholder="Năm phát hành"
          required
        />
        <input
          name="total_ep"
          type="number"
          value={form.total_ep}
          onChange={handleChange}
          placeholder="Tổng số tập"
          required
        />
        <input
          name="thumbnail"
          value={form.thumbnail}
          onChange={handleChange}
          placeholder="Liên kết ảnh bìa"
          required
        />
        <input
          name="trailer_url"
          value={form.trailer_url}
          onChange={handleChange}
          placeholder="Liên kết trailer"
          required
        />
        <button type="submit">Thêm phim</button>
      </form>
    </div>
  );
};

export default AddMovie;