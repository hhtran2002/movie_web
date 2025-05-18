"use client"

import React, { useEffect, useState, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "../styles/movieAdmin.css"

interface Movie {
  id: number
  name: string
  description: string
  status: string
  release_year: number
  total_ep: number
  trailer_url: string
  thumbnail: string
}

interface Episode {
  id: number
  ep_number: number
  ep_link: string
  title?: string
}

interface MovieDetails {
  id: number
  name: string
  episodes: Episode[]
}

const MovieAdmin: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null)
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [loadingEpisodes, setLoadingEpisodes] = useState<boolean>(false)
  const navigate = useNavigate()

  // Lấy danh sách phim
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          alert("❌ Vui lòng đăng nhập.")
          navigate("/login")
          return
        }
        const res = await axios.get<Movie[]>("/api/admin/movies", {
          headers: { Authorization: `Bearer ${token}` },
        })
        setMovies(res.data)
      } catch (err: any) {
        console.error("Lỗi khi lấy danh sách phim:", err.response?.data || err.message)
        alert("❌ Không lấy được danh sách phim.")
      }
    }
    fetchMovies()
  }, [navigate])

  // Lấy danh sách tập phim của phim được chọn
  const fetchEpisodes = useCallback(
    async (movieId: number) => {
      try {
        setLoadingEpisodes(true)
        const token = localStorage.getItem("token")
        if (!token) {
          alert("❌ Vui lòng đăng nhập.")
          navigate("/login")
          return
        }
        const res = await axios.get<MovieDetails>(`http://localhost:5000/api/movies/details/${movieId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        setEpisodes(res.data.episodes || [])
      } catch (err: any) {
        console.error("Lỗi khi lấy tập phim:", err.response?.data || err.message)
        alert(`❌ Lỗi: ${err.response?.data?.message || "Không lấy được danh sách tập phim."}`)
        setEpisodes([])
      } finally {
        setLoadingEpisodes(false)
      }
    },
    [navigate],
  )

  // Xử lý khi nhấn nút "Xem tập phim"
  const handleViewEpisodes = (movieId: number) => {
    if (selectedMovieId === movieId) {
      // Nếu đang hiển thị tập phim của phim này, ẩn đi
      setSelectedMovieId(null)
      setEpisodes([])
    } else {
      // Hiển thị tập phim của phim được chọn
      setSelectedMovieId(movieId)
      fetchEpisodes(movieId)
    }
  }

  // Xử lý xóa phim
  const handleDelete = async (id: number) => {
    if (!window.confirm("Bạn có chắc muốn xóa phim này?")) return
    try {
      const token = localStorage.getItem("token")
      await axios.delete(`/api/admin/movies/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setMovies((prev) => prev.filter((m) => m.id !== id))
      if (selectedMovieId === id) {
        setSelectedMovieId(null)
        setEpisodes([])
      }
      alert("✅ Xóa phim thành công.")
    } catch (err: any) {
      console.error("Lỗi khi xóa phim:", err.response?.data || err.message)
      alert("❌ Xóa phim thất bại.")
    }
  }

  // Xử lý xóa tập phim
  const handleDeleteEpisode = async (episodeId: number) => {
    if (!window.confirm("Bạn có chắc muốn xóa tập phim này?")) return
    try {
      const token = localStorage.getItem("token")
      await axios.delete(`/api/admin/episodes/${episodeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      // Cập nhật danh sách tập phim sau khi xóa
      setEpisodes((prev) => prev.filter((ep) => ep.id !== episodeId))
      alert("✅ Xóa tập phim thành công.")
    } catch (err: any) {
      console.error("Lỗi khi xóa tập phim:", err.response?.data || err.message)
      alert("❌ Xóa tập phim thất bại.")
    }
  }

  return (
    <div className="movie-admin-container">
      <div className="movie-admin-header">
        <h2>DANH SÁCH PHIM</h2>
        <button className="add-movie-btn" onClick={() => navigate("/admin/movies/add")}>
          Thêm Phim
        </button>
      </div>

      <div className="movie-table-wrapper">
  <table className="movie-table">
    {/* thead và tbody */}
    <thead>
          <tr>
            <th>ID</th>
            <th>Tên phim</th>
            <th>Năm</th>
            <th>Tổng tập</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((m) => (
            <React.Fragment key={m.id}>
              <tr>
                <td>{m.id}</td>
                <td>{m.name}</td>
                <td>{m.release_year}</td>
                <td>{m.total_ep}</td>
                <td>
                  <div className="action-buttons">
                  <button
                    className="add-episode-btn"
                    onClick={() =>
                      navigate(`/admin/episodes/add?movieId=${m.id}`)
                    }
                  >
                    Thêm
                  </button>
                    <button className="view-episodes-btn" onClick={() => handleViewEpisodes(m.id)}>
                      {selectedMovieId === m.id ? "Ẩn tập phim" : "Xem"}
                    </button>
                    <button className="delete-movie-btn" onClick={() => handleDelete(m.id)}>
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
              {/* Hiển thị danh sách tập phim nếu phim được chọn */}
              {selectedMovieId === m.id && (
                <tr>
                  <td colSpan={5}>
                    <div className="episodes-list">
                      {loadingEpisodes ? (
                        <div className="loading">
                          Đang tải... <span className="spinner" />
                        </div>
                      ) : episodes.length === 0 ? (
                        <p>Không có tập phim nào.</p>
                      ) : (
                        <ul>
                          {episodes.map((ep) => (
                            <li key={ep.id} className="episode-item">
                              Tập {ep.ep_number} {ep.title ? `- ${ep.title}` : ""}
                              <button className="delete-episode-btn" onClick={() => handleDeleteEpisode(ep.id)}>
                                Xóa
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}

          {movies.length === 0 && (
            <tr>
              <td colSpan={5} style={{ textAlign: "center", padding: "16px" }}>
                Không có phim nào.
              </td>
            </tr>
          )}
        </tbody>
  </table>
</div>
    </div>
  )
}

export default MovieAdmin
