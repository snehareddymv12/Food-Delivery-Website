import React, { useContext} from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../Context/StoreContext';

const FoodItem = ({ id, image, name, description, price }) => {
 
 const {cartItems,addToCart,removeFromCart,url}=useContext(StoreContext);
  return (
    <div className='food-item'>
      <div className='food-item-image-container'>
        <img src={url+"/images/" +image} className='image' alt={name} />
        { !cartItems[id] ? (
          <img
            className="add"
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt="Add"
          />
        ) : (
          <div className="food-item-counter">
          <img  onClick={() => addToCart(id)} src={assets.add_icon_green} alt=''/>
          <p> {cartItems[id]}</p>
           <img  onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt='' />
         
           
          </div>
        )}
      </div>
      <div className='info'>
        <div className='food-item-name'>
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Rating stars" />
        </div>
        <p className='description'>{description}</p>
        <p className='price'>${price}</p>
      </div>
    </div>
  );
}

export default FoodItem;
