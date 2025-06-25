import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'
const Navbar = () => {
  return (
    <div className='navbar'>
        <div className='title'>
        <p className='title-1'>ZapFood </p>
        <p className='title-2'>Admin Panel</p>
        </div>
         <div>
         <img src={assets.profile_image}/>
         </div>
    </div>
  )
}

export default Navbar