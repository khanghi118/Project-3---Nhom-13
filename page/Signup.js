import React from 'react'
import loginSignupImage from "../assest/login-animation.gif"
import {BiShow, BiHide} from "react-icons/bi"

    function Signup() {
        
return (
        
        <div    className='p-3 md:p-4'>
        <div    className='w-full max-w-sm bg-white m-auto flex items-center flex-col p-4'>
                {/* <h1>Signup</h1> */}
        <div    className='w-20 overflow-hidden rounded-full drop-shadow-md shadow-md ' ><img src={loginSignupImage} className="w-full"/>  
        </div>
        
        <form className="w-full py-3" >
                <label htmlFor='firstName'>First Name</label>
                <input type={"text"} id="firstName" name='firstName' className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-500'/>
                <label htmlFor='lastName'>Last Name</label>
                <input type={"text"} id="lastName" name='lastName' className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-500'/>
                <label htmlFor='email'>Email</label>
                <input type={"email"} id="email" name='email' className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-500'/>
                <label htmlFor='password'>Password</label>
                <div className='flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 outline focus-within:outline-blue-300' >
                <input type={"password"} id="password" name='password' className=' w-full bg-slate-200 border-none outline-none'/>
                <span className='' ><BiShow/><BiHide/></span>
        </div>
        </form>
        </div>
        </div>
        )}
export default Signup