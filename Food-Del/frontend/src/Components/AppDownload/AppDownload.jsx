import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'
const AppDownload = () => {
  return (
    <div className='app-download' id="app-download">
        <div className='details'>
        <p>For Better Experience Download</p>
        <p>ZapFood App</p>
        </div>
        <div className='image-container'>
             <img src={assets.play_store}/>
             <img src={assets.app_store} />
        </div>
    </div>
  )
}

export default AppDownload