import React from 'react';
import "../styles/footer.css";




const Footer: React.FC = () => {
  return (
    <footer className="footer">
    
      <div className="footer-column">
        <h3>GIỚI THIỆU</h3>
        <ul>
          <li><a href="/fandom">Fandom</a></li>
         
        </ul>
      </div>


      <div className="footer-column">
        <h3>LIÊN HỆ</h3>
        <ul>
          <li><a href="/about">About</a></li>

        </ul>
      </div>

      <div className="footer-column">
        <h3>PHÂN LOẠI</h3>
        <ul>
          <li><a href="/community-central">Community Central</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
