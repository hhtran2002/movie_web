
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "../styles/videoPlayer.css"

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

  // Fetch movie details
  const fetchMovieDetails = async () => {
    try {
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

  // Fetch comments & ratings
  const fetchDanhGia = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/ratings/movie/${id}`)
      if (!res.ok) throw new Error(await res.text())
      const data: Rating[] = await res.json()
      setDanhGia(data)
    } catch (err) {
      console.error("Error fetching ratings:", err)
    }
  }

  // Submit new rating/comment
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token")
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

  if (loading) return <div className="loading">Đang tải thông tin phim...</div>

  const youtubeId = extractYouTubeId(currentEpisodeUrl)

  return (
    <div className="video-container">
      {youtubeId ? (
        <div className="video-wrapper">
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}`}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Trình chiếu video"
          ></iframe>
        </div>
      ) : (
        <div>Link video không hợp lệ</div>
      )}

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

      {/* Tabs */}
      <div className="tab-navigation">
        <button
          className={`tab-button ${activeTab === "episodes" ? "active" : ""}`}
          onClick={() => setActiveTab("episodes")}
        >
          Tập Phim
        </button>
        <button
          className={`tab-button ${activeTab === "comments" ? "active" : ""}`}
          onClick={() => setActiveTab("comments")}
        >
          Bình Luận
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "episodes" && (
          <div className="episodes">
            {movieDetails.episodes?.map((ep: any) => {
              const epId = extractYouTubeId(ep.ep_link)
              const isSelected = currentEpisodeUrl === ep.ep_link
              return (
                <div
                  key={ep.ep_number}
                  className={`episode-item ${isSelected ? "selected" : ""}`}
                  onClick={async () => {
                    setCurrentEpisodeUrl(ep.ep_link)

                    try {
                      const token = localStorage.getItem("token")
                      if (token) {
                        await fetch("http://localhost:5000/api/history/save", {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                          },
                          body: JSON.stringify({
                            movieId: movieDetails.id,
                            epNumber: ep.ep_number,
                          }),
                        })
                      }
                    } catch (err) {
                      console.error("Lỗi khi lưu lịch sử xem:", err)
                    }
                  }}
                >
                  <img
                    src={`https://img.youtube.com/vi/${epId}/hqdefault.jpg`}
                    alt={`Episode ${ep.ep_number}`}
                    className="episode-thumbnail"
                  />
                  <p>Tập {ep.ep_number}</p>
                </div>
              )
            })}
          </div>
        )}

        {activeTab === "comments" && (
          <div className="comments">
     
            {/* Form thêm bình luận */}
            <div className="comment-input-container">
              <div className="comment-input-wrapper">
                <input
                  type="text"
                  className="comment-input"
                  placeholder="Bình luận..."
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
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default VideoPlayer
