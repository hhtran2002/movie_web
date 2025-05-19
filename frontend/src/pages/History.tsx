import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/history.css';

interface HistoryItem {
  id: number;
  watchedAt: string;
  Movie?:   { id: number; name: string };
  Episode?: { id: number; ep_number: number };
}

const History: React.FC = () => {
  const [list, setList] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get<HistoryItem[]>('/api/history', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => setList(res.data))
      .catch(err => {
        console.error(err);
        alert('Không tải được lịch sử xem phim.');
      });
  }, []);


  return (
    <div className="history-container">
      <h2>LỊCH SỬ XEM PHIM</h2>
      {list.length === 0 ? (
        <p>Bạn chưa xem phim nào.</p>
      ) : (
        <ul className="history-list">
          {list.map(item => (
            <li key={item.id} className="history-item">
              <Link
                to={item.Episode
                  ? `/watch/${item.Episode.id}`
                  : `/movies/${item.Movie?.id}`}
                className="history-link"
              >
                {item.Episode
                  ? `Tập ${item.Episode.ep_number} – ${item.Movie?.name}`
                  : item.Movie?.name}
              </Link>
              <span className="history-date">
                {new Date(item.watchedAt).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default History;
