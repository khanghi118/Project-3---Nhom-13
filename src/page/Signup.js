import React, { useState } from "react";
import loginSignupImage from "../assest/login-animation.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { BsEmojiSmileUpsideDown } from "react-icons/bs";
import { ImagetoBase64 } from "../utility/ImagetoBase64";
import { toast } from "react-hot-toast";

function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    image : "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    
  });

  const handleShowPassword = () => {
        setShowPassword((preve) => !preve);
  };
  const handleShowConfirmPassword = () => {
        setShowConfirmPassword((preve) => !preve);
  };

  const handleOnChange = (e) => {
  const { name, value } = e.target;
        setData((preve) => {
        return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleUploadProfileImage = async(e)=>{
  const data = await ImagetoBase64(e.target.files[0])
  console.log(data)
          setData((preve)=>{
          return{
          ...preve,
          image : data
      }
      })
      }
  console.log(process.env.REACT_APP_SERVER_DOMIN)
  const handleSubmit = async(e) => {
      e.preventDefault();
  const { firstName, email, password, confirmPassword } = data;
if (firstName && email && password && confirmPassword) {
if (password === confirmPassword) {
  const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/signup`,{
        method : "POST",
        headers : {"content-type" : "application/json"},
        body : JSON.stringify(data)
        })
        const dataRes = await fetchData.json()
        console.log(dataRes)

    // Alert(dataRes.message);
        toast.success(dataRes.message)
        if(dataRes.alert){
        navigate("/login");
      }

      }   else {
              alert("password and confirm password not equal");
      }

      }   else {
              alert("Please Enter required fields");
      }
  };
  
return (
  <div className='p-3 md:p-4'>
  <div className='w-full max-w-sm bg-white m-auto flex items-center flex-col p-4'>
  <div className='w-20 drop-shadow-md shadow-md'>
  <img src={data.image ? data.image : loginSignupImage} alt="Login or Signup Image" />
  <label htmlFor="profileImage">
  <div className="absolute bottom--1 text-xl text-center bg-black text-white p-1 "><p>Upload⇧</p>
  </div>
  <input type={"file"} id="profileImage" accept="image/*" className="hidden" onChange={handleUploadProfileImage} />
  </label>
  </div>

  <form className="w-full py-9 flex flex-col" onSubmit={handleSubmit}>
  <label htmlFor='firstName'>First Name</label>
  <input
    type={"text"}
    id="firstName"
    name='firstName'
    className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-500'
    value={data.firstName}
    onChange={handleOnChange}/>

  <label htmlFor='lastName'>Last Name</label>
  <input
    type={"text"}
    id="lastName"
    name='lastName'
    className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-500'
    value={data.lastName}
    onChange={handleOnChange}/>

  <label htmlFor='email'>Email</label>
  <input
    type={"email"}
    id="email"
    name='email'
    className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-500'
    value={data.email}
    onChange={handleOnChange}/>

  <label htmlFor="password">Password</label>
  <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 outline focus-within:outline-blue-300">
  <input
    type={showPassword ? "text" : "password"}
    id="password"
    name="password"
    className="w-full bg-slate-200 border-none outline-none"
    value={data.password}
    onChange={handleOnChange}/>
  <span className="flex-text-xl cursor-pointer" onClick={handleShowPassword}>{showPassword ? <BiShow /> : <BiHide />}</span>
  </div>

  <label htmlFor="confirmPassword">Confirm Password</label>
  <div className='flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 outline focus-within:outline-blue-300'>
  <input
    type={showConfirmPassword ? "text" : "password"}
    id="confirmPassword"
    name="confirmPassword"
    className="w-full bg-slate-200 border-none outline-none"
    value={data.confirmPassword}
    onChange={handleOnChange}/>
  <span className='flex-text-xl cursor-pointer' onClick={handleShowConfirmPassword}>{showConfirmPassword ? <BiShow /> : <BiHide />}</span>
  </div>
  <button className={`w-full max-w-${150}px m-auto bg-black hover:bg-black cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4`}>Sign up</button>
  </form>
  <p className='mt--9'>Already have an account? <Link to={"/login"} className='underline'>Log In</Link></p>
  </div>
  </div>
  );
  }

export default Signup;
