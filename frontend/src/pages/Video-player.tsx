<<<<<<< HEAD
// src/components/VideoPlayer.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/video-player.css";

const extractYouTubeId = (url: string): string => {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : "";
};

interface Rating {
  id: number;
  review: string;
  rating: number;
  user?: { id: number; name: string };
}

const VideoPlayer = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<"episodes" | "comments">("comments");
  const [movieDetails, setMovieDetails] = useState<any>(null);
  const [currentEpisodeUrl, setCurrentEpisodeUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const [danhGias, setDanhGia] = useState<Rating[]>([]);
  const [newReview, setNewReview] = useState<string>("");
  const [newRating, setNewRating] = useState<number>(5);
=======
"use client"

// src/components/VideoPlayer.tsx
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "../styles/video-player.css"

const extractYouTubeId = (url: string): string => {
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  return match ? match[1] : ""
}

interface Rating {
  id: number
  review: string
  rating: number
  user?: { id: number; name: string }
}

const VideoPlayer = () => {
  const { id } = useParams<{ id: string }>()
  const [activeTab, setActiveTab] = useState<"episodes" | "comments">("comments")
  const [movieDetails, setMovieDetails] = useState<any>(null)
  const [currentEpisodeUrl, setCurrentEpisodeUrl] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)

  const [danhGias, setDanhGia] = useState<Rating[]>([])
  const [newReview, setNewReview] = useState<string>("")
  const [newRating, setNewRating] = useState<number>(5)
  const [hoverRating, setHoverRating] = useState<number>(0)
>>>>>>> origin/branchKieu

  // Fetch movie details
  const fetchMovieDetails = async () => {
    try {
<<<<<<< HEAD
      setLoading(true);
      const res = await fetch(`http://localhost:5000/api/movies/details/${id}`);
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setMovieDetails(data);
      if (data.episodes?.length) {
        setCurrentEpisodeUrl(data.episodes[0].ep_link);
      } else {
        setCurrentEpisodeUrl(data.trailer_url);
      }
    } catch (err) {
      console.error("Error fetching movie details:", err);
    } finally {
      setLoading(false);
    }
  };
=======
      setLoading(true)
      const res = await fetch(`http://localhost:5000/api/movies/details/${id}`)
      if (!res.ok) throw new Error(await res.text())
      const data = await res.json()
      setMovieDetails(data)
      if (data.episodes?.length) {
        setCurrentEpisodeUrl(data.episodes[0].ep_link)
      } else {
        setCurrentEpisodeUrl(data.trailer_url)
      }
    } catch (err) {
      console.error("Error fetching movie details:", err)
    } finally {
      setLoading(false)
    }
  }
>>>>>>> origin/branchKieu

  // Fetch comments & ratings
  const fetchDanhGia = async () => {
    try {
<<<<<<< HEAD
      const res = await fetch(`http://localhost:5000/api/ratings/movie/${id}`);
      if (!res.ok) throw new Error(await res.text());
      const data: Rating[] = await res.json();
      setDanhGia(data);
    } catch (err) {
      console.error("Error fetching ratings:", err);
    }
  };
=======
      const res = await fetch(`http://localhost:5000/api/ratings/movie/${id}`)
      if (!res.ok) throw new Error(await res.text())
      const data: Rating[] = await res.json()
      setDanhGia(data)
    } catch (err) {
      console.error("Error fetching ratings:", err)
    }
  }
>>>>>>> origin/branchKieu

  // Submit new rating/comment
  const handleSubmit = async () => {
    try {
<<<<<<< HEAD
      const token = localStorage.getItem("token");
=======
      const token = localStorage.getItem("token")
>>>>>>> origin/branchKieu
      const res = await fetch(`http://localhost:5000/api/ratings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({
          movieId: Number(id),
          rating: newRating,
          review: newReview.trim(),
        }),
<<<<<<< HEAD
      });
      if (!res.ok) throw new Error(await res.text());
      setNewReview("");
      setNewRating(5);
      await fetchDanhGia();
    } catch (err) {
      console.error("Error submitting rating:", err);
      alert("Không thể gửi đánh giá. Vui lòng thử lại.");
    }
  };

  useEffect(() => {
    if (id) {
      fetchMovieDetails();
      fetchDanhGia();
    }
  }, [id]);

  if (loading) return <div className="loading">Loading movie details...</div>;

  const youtubeId = extractYouTubeId(currentEpisodeUrl);
=======
      })
      if (!res.ok) throw new Error(await res.text())
      setNewReview("")
      setNewRating(5)
      await fetchDanhGia()
    } catch (err) {
      console.error("Error submitting rating:", err)
      alert("Không thể gửi đánh giá. Vui lòng thử lại.")
    }
  }

  useEffect(() => {
    if (id) {
      fetchMovieDetails()
      fetchDanhGia()
    }
  }, [id])

  if (loading) return <div className="loading">Loading movie details...</div>

  const youtubeId = extractYouTubeId(currentEpisodeUrl)
>>>>>>> origin/branchKieu

  return (
    <div className="video-container">
      {youtubeId ? (
        <div className="video-wrapper">
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}`}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="YouTube video player"
          />
        </div>
      ) : (
        <div>Link video không hợp lệ</div>
      )}

<<<<<<< HEAD
=======
      {/* Video Info and Rating */}
      <div className="video-info">
        <h2 className="video-title">{movieDetails?.name}</h2>
        <div className="video-actions">
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${star <= (hoverRating || newRating) ? "filled" : "empty"}`}
                onClick={() => setNewRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
              >
                ★
              </span>
            ))}
          </div>
          <span className="rating-text">{newRating}/5</span>
        </div>
      </div>

>>>>>>> origin/branchKieu
      {/* Tabs */}
      <div className="tab-navigation">
        <button
          className={`tab-button ${activeTab === "episodes" ? "active" : ""}`}
          onClick={() => setActiveTab("episodes")}
        >
<<<<<<< HEAD
          Episodes
=======
          Tập Phim
>>>>>>> origin/branchKieu
        </button>
        <button
          className={`tab-button ${activeTab === "comments" ? "active" : ""}`}
          onClick={() => setActiveTab("comments")}
        >
<<<<<<< HEAD
          Comments
=======
          Bình Luận
>>>>>>> origin/branchKieu
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "episodes" && (
          <div className="episodes">
<<<<<<< HEAD
            <h3>Episodes</h3>
            {movieDetails.episodes?.map((ep: any) => {
              const epId = extractYouTubeId(ep.ep_link);
              const isSelected = currentEpisodeUrl === ep.ep_link;
=======
            {movieDetails.episodes?.map((ep: any) => {
              const epId = extractYouTubeId(ep.ep_link)
              const isSelected = currentEpisodeUrl === ep.ep_link
>>>>>>> origin/branchKieu
              return (
                <div
                  key={ep.ep_number}
                  className={`episode-item ${isSelected ? "selected" : ""}`}
                  onClick={() => setCurrentEpisodeUrl(ep.ep_link)}
                >
                  <img
                    src={`https://img.youtube.com/vi/${epId}/hqdefault.jpg`}
                    alt={`Episode ${ep.ep_number}`}
                    className="episode-thumbnail"
                  />
<<<<<<< HEAD
                  <p>Episode {ep.ep_number}</p>
                </div>
              );
=======
                  <p>Tập {ep.ep_number}</p>
                </div>
              )
>>>>>>> origin/branchKieu
            })}
          </div>
        )}

        {activeTab === "comments" && (
          <div className="comments">
<<<<<<< HEAD
            <h3 className="comments-header">User Reviews</h3>

            {/* Form thêm bình luận */}
            <div className="comment-input-container">
              <div className="comment-input-wrapper">
                <select
                  value={newRating}
                  onChange={(e) => setNewRating(Number(e.target.value))}
                  className="rating-select"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n} sao
                    </option>
                  ))}
                </select>
=======
     
            {/* Form thêm bình luận */}
            <div className="comment-input-container">
              <div className="comment-input-wrapper">
>>>>>>> origin/branchKieu
                <input
                  type="text"
                  className="comment-input"
                  placeholder="Viết nhận xét..."
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                />
                <button className="comment-button" onClick={handleSubmit}>
                  Gửi
                </button>
              </div>
            </div>

            {/* Danh sách bình luận */}
            <div className="comment-list">
              {danhGias.length === 0 && <p>Chưa có bình luận nào.</p>}
              {danhGias.map((dg) => (
                <div key={dg.id} className="comment-item">
<<<<<<< HEAD
                  <div className="comment-author">
                    {dg.user?.name || "Ẩn danh"} — ⭐{dg.rating}/5
                  </div>
                  <div className="comment-text">{dg.review}</div>
=======
                  <div className="comment-author">{dg.user?.name || "Ẩn danh"}</div>
                  <div className="comment-content">
                    <div className="comment-rating">
                      {Array.from({ length: 5 }, (_, i) => (
                        <span key={i} className={`star ${i < dg.rating ? "filled" : "empty"}`}>
                          ★
                        </span>
                      ))}
                    </div>
                    <div className="comment-text">{dg.review}</div>
                  </div>
>>>>>>> origin/branchKieu
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
<<<<<<< HEAD
  );
};

export default VideoPlayer;
=======
  )
}

export default VideoPlayer
>>>>>>> origin/branchKieu
