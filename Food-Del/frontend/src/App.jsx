import React, { useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Cart from './Pages/Cart/Cart'
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder'
import Footer from './Components/Footer/Footer'
import LoginPopup from './Components/LoginPopup/LoginPopup'
import SearchResults from './Components/Search/Search'
import Verify from './Pages/Verify/Verify'
import MyOrders from './Pages/MyOrders/MyOrders'

const App = () => {
  const [Login,setLogin]=useState(false);
  // const [showContactUs, setShowContactUs] = useState(false);
  return (
    <>
    {Login?<LoginPopup setLogin={setLogin}/>:<></>}
    <div className='app'>
      <Navbar setLogin={setLogin}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/placeholder' element={<PlaceOrder/>}/>
       
        <Route path="/search/:searchTerm" element={<SearchResults />} />
         <Route path='/verify' element={<Verify/>}/>
         <Route path='/myorders' element={<MyOrders/>}/>
       
      </Routes>
    </div>
    

    <Footer/>
    </>
  )
}

export default App