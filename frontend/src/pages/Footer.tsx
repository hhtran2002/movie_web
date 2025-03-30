import React from 'react';
import "../styles/footer.css";




const Footer: React.FC = () => {
  return (
    <footer className="footer">
    
      {/* Column 1: Explore Properties */}
      <div className="footer-column">
        <h3>Explore Properties</h3>
        <ul>
          <li><a href="/fandom">Fandom</a></li>
          <li><a href="/gamepedia">Gamepedia</a></li>
          <li><a href="/dnd-beyond">D&D Beyond</a></li>
          <li><a href="/cortex-rpg">Cortex RPG</a></li>
          <li><a href="/muthead">Muthead</a></li>
          <li><a href="/futhead">Futhead</a></li>
        </ul>
      </div>


      {/* Column 3: Overview */}
      <div className="footer-column">
        <h3>Overview</h3>
        <ul>
          <li><a href="/about">About</a></li>
          <li><a href="/careers">Careers</a></li>
          <li><a href="/press">Press</a></li>
          <li><a href="/contact">Contact</a></li>

        </ul>
      </div>

      {/* Column 4: Community */}
      <div className="footer-column">
        <h3>Community</h3>
        <ul>
          <li><a href="/community-central">Community Central</a></li>
          <li><a href="/support">Support</a></li>
          <li><a href="/help">Help</a></li>
          <li><a href="/do-not-sell">Do Not Sell My Info</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
