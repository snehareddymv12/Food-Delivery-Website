import React from 'react';
import './Footer.css';
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <div className='footer' id="footer">
      <div className='footer-content'>
        <div className='footer-left'>
          {/* <img src={assets.logo} alt="Logo" /> */}
          <p className='logo'>Food App</p>
          <p>
            Lorem Ipsum is a dummy text commonly used in the printing and typesetting industry. It serves as a placeholder text, allowing designers and developers to focus on the layout and design of a document or website without being distracted by meaningful content.
          </p>
          <div className='footer-icons'>
            <img src={assets.facebook_icon} alt="Facebook" />
            <img src={assets.twitter_icon} alt="Twitter" />
            <img src={assets.linkedin_icon} alt='LinkedIn'/>
          </div>
        </div>
        <div className='footer-center'>
          <ul className='info'>
            <h2>Company</h2>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className='footer-right'>
          <h2>GET IN TOUCH</h2>
          <ul className='info-2'>
            <li>1-209-234-234</li>
            <li>contact@foodapp.com</li>
          </ul>
        </div>
      </div>
      <hr/>
      <p className='copyright'>
        2024@Copyright-All rights are Reserved
      </p>
    </div>
  );
}

export default Footer;
