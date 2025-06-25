import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import { StoreContext } from '../Context/StoreContext'
import axios from 'axios'
const LoginPopup = ({setLogin}) => {

     const {url,setToken}=useContext(StoreContext)


    const [currState,setCurrState]=useState("Login");
     //to store user email and password coming from backend

     const [data,setData]=useState({
          name:"" ,
          email:"",
          password:""
     })

  const onChangeHandler=(event)=>{
      const name=event.target.name;
      const value=event.target.value;
      setData(data=>({...data,[name]:value}))
  }

  const onLogin= async(event)=>{

       event.preventDefault();


       //calling the api using axios
       let newUrl=url;
       if(currState==="Login"){
        newUrl +="/api/user/login"
       }
       else{
        newUrl+="/api/user/register"
       }

       const response= await axios.post(newUrl,data);


       if(response.data.success){
           setToken(response.data.token);
           localStorage.setItem("token",response.data.token); //storing token in localstorage
           setLogin(false)  //to hide login page
       }
        else{
         alert(response.data.message)  
        }
  }


  return (
    <div className='login-popup' id='login-popup'>
      <form  onSubmit={onLogin} className='login-form'>
           <div className='login-title'>
               <h2>{currState}</h2>
               <img onClick={()=>setLogin(false)} src={assets.cross_icon} alt=''/>
           </div>
           <div className='login-details'>

            {currState==="Login" ? <></>: <input name='name' onChange={onChangeHandler}  value={data.name} type='text' placeholder='Your Name'/>}
                
                 <input name='email' onChange={onChangeHandler} value={data.email} type='email' placeholder='Email'/>
                 <input name='password' onChange={onChangeHandler}  value={data.password} type='password' placeholder='Password'/>
           </div>
           <button type='submit'>{currState==="Sign Up" ? "Create Account":"Login"}</button>
           <div className='login-popup-container'>
            <input type='checkbox' required/>
              <p> By Continuing,I agree to  the terms of use & privacy policy</p>
           </div>
           <p>Create a new account ? <span onClick={()=>setCurrState("Sign Up")}>Click Here</span></p>
           <p>Already have an account?<span onClick={()=>setCurrState("Login")}>Login Here</span></p>
      </form>
    </div>
  )
}

export default LoginPopup