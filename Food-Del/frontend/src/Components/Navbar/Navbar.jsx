import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from "../Context/StoreContext";
import AddIcCallOutlinedIcon from '@mui/icons-material/AddIcCallOutlined';

import Modal from 'react-modal';

const Navbar = ({ setLogin }) => {

  const [menu, setMenu] = useState("menu");
  const [searchTerm, setSearchTerm] = useState("");
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const { getTotalCartAmount, token, setToken, fetchSearhcList } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/"); // Redirecting the user to homepage
  };

  const handleSearch = () => {
    console.log(searchTerm)
    fetchSearhcList(searchTerm)
    if (searchTerm.trim()) {
      navigate(`/search/${searchTerm}`);
    }
    // setSearchTerm("");
  };

  const onClickHome =()=>{
    setMenu("home")
    setSearchTerm("")
  }

  const onClickMenu =()=>{
    setMenu("menu")
    setSearchTerm("")
  }
  const onClickApp =()=>{
    setMenu("mobile-app")
    setSearchTerm("")
  }
  // const onClickContact=()=>{
  //   setMenu("contact-us")
  //   setSearchTerm("")
  // }
  const openContactModal = () => {
    setIsContactModalOpen(true);
  };

  const closeContactModal = () => {
    setIsContactModalOpen(false);
  };

  return (
    <div className="navbar">
      {/* <Link to="/"> <img className="logo" src={assets.logo} /> </Link> */}
      <Link to="/" onClick={() => setSearchTerm("")}> <p className="logo">ZapFood</p></Link>

      <ul className="navbar-menu">
        <Link to="/" onClick={() => onClickHome()} className={menu === "home" ? "active" : ""}> Home </Link>
        < a href="/#explore-menu" onClick={() => onClickMenu()} className={menu === "menu" ? "active" : ""}> Menu </a>
        {/* <Link to="/#explore-menu" onClick={() => onClickMenu()} className={menu === "menu" ? "active" : ""}> Menu</Link> */}
        < a href="/#app-download" onClick={() =>onClickApp()} className={menu === "mobile-app" ? "active" : ""}> Mobile-App </a>
        {/* <a href="/#contact" onClick={() => onClickContact()} className={menu === "contact-us" ? "active" : ""}> Contact-Us </a> */}
      </ul>

      <div className="navbar-right">

        <div className="navbar-search">

          <input className="input"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
          />
          <button onClick={handleSearch}>
            <img src={assets.search_icon} alt="Search" />
          </button>

        </div>

        <div className="navbar-search-icon">
          <Link to="/cart"><img src={assets.basket_icon} /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>

        {!token ? <button onClick={() => setLogin(true)}>sign in</button> :

          <div className="navbar-profile">

            <img src={assets.profile_icon} alt="" />

            <ul className="nav-profile-dropdown">
              <li onClick={()=>navigate("/myorders")}><img src={assets.bag_icon} alt=""/><p>Orders</p></li>
               <hr/>
               <li onClick={openContactModal}> <AddIcCallOutlinedIcon style={{color:"tomato"}}/><p>Contact</p></li>
               <hr />
               
              <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
            </ul>
          </div>
        }


      </div>
      <Modal
        isOpen={isContactModalOpen}
        onRequestClose={closeContactModal}
        contentLabel="Contact Us"
        className="contact-modal"
        overlayClassName="contact-modal-overlay"
      >
        <h2>Contact Us</h2>
        <div className="modal-content">
          <p><strong>Name:</strong> Sneha</p>
          <p><strong>Email:</strong> snehareddymvdtcs@gmail.com</p>
          <p><strong>Phone:</strong>8660587624</p>
          <p><strong>Address:</strong>Bangalore,karnataka</p>
          <button onClick={closeContactModal}>Close</button>
        </div>
      </Modal>

    </div>
  );
};

export default Navbar;
