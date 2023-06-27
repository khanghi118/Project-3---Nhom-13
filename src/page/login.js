import React, { useState } from 'react'
import loginSignupImage from "../assest/logologin.png"
import {BiShow, BiHide} from "react-icons/bi"
import { Link } from 'react-router-dom'
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginRedux } from '../redux/userSlice';

function Login() {
      const [showPassword, setshowPassword] = useState(false)
      const [data, setData] = useState({
                email : "",
              password: "",})
      const navigate = useNavigate()
      const userData = useSelector(state => state)
      const dispatch = useDispatch()
      const handleShowPassword = () => {setshowPassword(preve => !preve)}
      const handleOnchange = (e) => {
      const {name,value} = e.target
      setData((preve) =>{
return {
      ...preve,
      [name] : value
      }
    }
  )
}

      const handleSubmit = async (e) => {
            e.preventDefault();
      const { email, password } = data;
  if (email && password) {
      const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/login`,{
            method : "POST",
            headers : {"content-type" : "application/json"},
            body : JSON.stringify(data)
        })
      
      const dataRes = await fetchData.json()
              // alert(dataRes.message);
      console.log(dataRes)
      
      toast.success(dataRes.message)
      if(dataRes.alert){
            dispatch(loginRedux(dataRes))
           setTimeout(()=>{
                  navigate("/")
           },1000)
      } 
      console.log(userData)
    };
}              

return (
        <div className='p-3 md:p-4'>
        <div className='w-full max-w-sm bg-white m-auto flex items-center flex-col p-4'>       
        <div className='' >
        <img src={loginSignupImage} className="w-full"/>  
        </div>
        <form className="w-full py-3  flex flex-col" onSubmit={handleSubmit}>

        <label htmlFor='email'>Email</label>
        <input type={"email"} 
        id="email"
        name='email' 
        className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-500'
        value={data.email}
        onChange={handleOnchange}/>
        <label htmlFor="password">Password</label>
  
        <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 outline focus-within:outline-blue-300" >
        <input type={showPassword ? "text":"password"} 
        id="password"
        name="password" 
        className="w-full bg-slate-200 border-none outline-none"
        value={data.password}
        onChange={handleOnchange}/>
        <span className="flex-text-xl cursor-pointer"
        onClick={handleShowPassword}>{showPassword ?<BiShow/>:<BiHide/>}</span>
        </div> 
        <button className=" w-full max-w-{150px} m-auto bg-black hover:bg-black cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4" >Log In
        </button>
        </form>
        <p className='mt-2'>Don't have account? <Link to={"/signup"} className='underline'>Sign up</Link></p>
        </div>
        </div>
  )}

export default Login;