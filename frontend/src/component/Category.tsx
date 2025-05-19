import { useParams } from 'react-router-dom';

function Category() {
  const { slug } = useParams();

  return (
    <div>
      <h1>Danh mục: {slug ? slug.replace('-', ' ') : ''}</h1>
      {/* Hiển thị danh sách phim theo slug */}
    </div>
  );
}

export default Category;
