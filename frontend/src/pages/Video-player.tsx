import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/video-player.css";

const extractYouTubeId = (url: string): string => {
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : "";
};

interface Rating {
  id: number;
  review: string;
  rating: number
  user?: {
    id: number;
    name: string;
  };
}


const VideoPlayer = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("comments");
  const [movieDetails, setMovieDetails] = useState<any>(null);
  const [currentEpisodeUrl, setCurrentEpisodeUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const [danhGias, setDanhGia] = useState<Rating[]>([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        console.log(`Fetching movie details for ID: ${id}`);
        const response = await fetch(`http://localhost:5000/api/movies/details/${id}`); // Sửa từ /api/${id} thành /api/movies/${id}
        console.log('Response status:', response.status);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
        }
        const data = await response.json();
        console.log('API response:', data);
        setMovieDetails(data);
    
        if (data.episodes?.length > 0) {
          setCurrentEpisodeUrl(data.episodes[0].ep_link);
          console.log('Episode link:', data.episodes[0].ep_link);
        } else {
          setCurrentEpisodeUrl(data.trailer_url);
          console.log('Trailer URL:', data.trailer_url);
        }
        console.log('Current Episode URL:', currentEpisodeUrl);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchDanhGia = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/movies/danhgia/${id}`);
        if (!res.ok) throw new Error("Lỗi khi lấy đánh giá");
        const data = await res.json();
        setDanhGia(data);
      } catch (error) {
        console.error("Lỗi khi lấy đánh giá:", error);
      }
    };
  
    if (id) fetchMovieDetails();
    if (id) fetchDanhGia();
  }, [id]);
  if (loading) {
    return <div className="loading">Loading movie details...</div>;
  }

  return (
    <div className="video-container">
    {currentEpisodeUrl ? (
      (() => {
        const youtubeId = extractYouTubeId(currentEpisodeUrl);
        if (!youtubeId) {
          return <div>Link video không hợp lệ</div>;
        }
        return (
          <div className="video-placeholder">
            <iframe
              width="100%"
              height="750"
              src={`https://www.youtube.com/embed/${youtubeId}`}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="YouTube video player"
            ></iframe>
          </div>
        );
      })()
    ) : (
      <div>Không có video để hiển thị</div>
    )}

      {/* Tabs */}
      <div className="tab-navigation">
        <button
          className={`tab-button ${activeTab === "episodes" ? "active" : ""}`}
          onClick={() => setActiveTab("episodes")}
        >
          Episodes
        </button>
        <button
          className={`tab-button ${activeTab === "comments" ? "active" : ""}`}
          onClick={() => setActiveTab("comments")}
        >
          Comments
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "episodes" && (
          <div className="episodes">
            <h3>Episodes</h3>
            {movieDetails?.episodes?.map((episode: any, index: number) => {
              const episodeId = extractYouTubeId(episode.ep_link);
              const isSelected = currentEpisodeUrl === episode.ep_link;

              return (
                <div
                  key={index}
                  className={`episode-item ${isSelected ? "selected" : ""}`}
                  onClick={() => setCurrentEpisodeUrl(episode.ep_link)}
                >
                  <img
                    src={`https://img.youtube.com/vi/${episodeId}/hqdefault.jpg`}
                    alt={`Episode ${episode.ep_number}`}
                    className="episode-thumbnail"
                  />
                  <p>Episode {episode.ep_number}</p>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === "comments" && (
          <div className="comments">
            <h3 className="comments-header">Comments </h3>
            <div className="comment-input-container">
              <div className="comment-input-wrapper">
                <input type="text" className="comment-input" placeholder="Add a comment..." />
                <button className="comment-button">Comment</button>
              </div>
            </div>

            <div className="comment-list">
              {danhGias.map((danhGia) => (
                <div key={danhGia.id}>
                  <div className="comment-item">
                      <div className="comment-content">
                        <p className="comment-author">{danhGia.user?.name}: {danhGia.review}</p>
                        <p className="rating">⭐{danhGia.rating}/5</p>
                      </div>
                    </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;