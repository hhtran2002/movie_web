import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AddEpisode.css"; // Thêm import CSS

const AddEpisode = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const movieId = params.get("movieId");

  const [epNumber, setEpNumber] = useState("");
  const [epLink, setEpLink] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!movieId) {
      alert("❌ Movie ID is missing.");
      return;
    }
    try {
      await axios.post("/api/admin/episodes", {
        movieId: Number(movieId),
        ep_link: epLink,
        ep_number: Number(epNumber),
      });
      alert("✅ Thêm tập phim thành công!");
      navigate(`/admin/movies/list`);
    } catch (err: any) {
      console.error("Lỗi khi thêm tập phim:", err.response?.data || err.message);
      alert(`❌ Lỗi khi thêm tập phim: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div className="add-episode-container">
      <h2>THÊM TẬP PHIM</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Số tập"
          value={epNumber}
          onChange={(e) => setEpNumber(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Link video"
          value={epLink}
          onChange={(e) => setEpLink(e.target.value)}
          required
        />
        <button type="submit">Thêm</button>
      </form>
    </div>
  );
};

export default AddEpisode;
