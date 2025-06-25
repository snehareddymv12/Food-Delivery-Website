import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'
const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore  our  menu</h1>
        <p className='explore-menu-text'>Choose from a diverse menu featuring a dlectable array of dishes.</p>
        <div className='explore-menu-list'>
             {menu_list.map((item,index)=>{
                return(
                  <a href="#food-display">
                  <div
                  key={index}
                  
                  className={`explore-menu-list-items ${category === item.menu_name ? 'active' : ''}`}
                  onClick={() => setCategory(item.menu_name)}
                >
                         <img className={category === item.menu_name ? 'active' : ''} src={item.menu_image} alt=''/>
                         <p>{item.menu_name}</p>

                    </div>
                    </a>
                )
             })}
        </div>
        <hr/>
    </div>
  )
}

export default ExploreMenu