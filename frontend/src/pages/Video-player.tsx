"use client"

import { useState } from "react"
import "../styles/video-player.css"

const VideoPlayer = () => {
  const [activeTab, setActiveTab] = useState("comments")

  return (
    <div className="video-container">
      {/* Thay thế trình phát video bằng div */}
      <div className="video-placeholder">
        <p>Đây là div thay thế trình phát video</p>
      </div>

      {/* Tab Navigation */}
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

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === "episodes" && (
          <div className="episodes">
            <h3>Episodes</h3>
            {/* Ví dụ danh sách episodes */}
            <div className="episode-item">
              <p>Episode 1</p>
            </div>
            <div className="episode-item">
              <p>Episode 2</p>
            </div>
            <div className="episode-item">
              <p>Episode 3</p>
            </div>
          </div>
        )}

        {activeTab === "comments" && (
          <div className="comments">
            <h3 className="comments-header">Comments (124)</h3>

            {/* Comment input */}
            <div className="comment-input-container">
              <div className="user-avatar"></div>
              <div className="comment-input-wrapper">
                <input type="text" className="comment-input" placeholder="Add a comment..." />
                <button className="comment-button">Comment</button>
              </div>
            </div>

            {/* Comment list */}
            {/* <div className="comment-list">
              <div className="comment-item">
                <div className="user-avatar"></div>
                <div className="comment-content">
                  <p className="comment-author">User1</p>
                  <p className="comment-text">Great movie! I loved the special effects.</p>
                </div>
              </div>

              <div className="comment-item">
                <div className="user-avatar"></div>
                <div className="comment-content">
                  <p className="comment-author">User2</p>
                  <p className="comment-text">The storyline was amazing, can't wait for the sequel!</p>
                </div>
              </div>
            </div> */}
          </div>
        )}
      </div>
    </div>
  )
}

export default VideoPlayer
