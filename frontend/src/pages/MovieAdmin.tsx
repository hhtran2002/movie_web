
import '../styles/movieadmin.css';

const MoviesList = () => {
  const movies = [
    { id: 1, title: "Avengers: Endgame", genre: "Action", year: 2019 },
    { id: 2, title: "Inception", genre: "Sci-Fi", year: 2010 },
    { id: 3, title: "The Dark Knight", genre: "Action", year: 2008 },
  ];

  return (
    <div className="movie-list">
      <h1>🎞️ Danh sách Phim</h1>
      <table className="movie-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên phim</th>
            <th>Thể loại</th>
            <th>Năm</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id}>
              <td>{movie.id}</td>
              <td>{movie.title}</td>
              <td>{movie.genre}</td>
              <td>{movie.year}</td>
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

export default MoviesList;
