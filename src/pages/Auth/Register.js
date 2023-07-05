import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { toast } from 'react-toastify';
import axios from 'axios';

import { useNavigate } from "react-router-dom";

 
const Register = () => {  
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const navigate = useNavigate()
    
//form function
const handleSubmit = async (e) => {
  e.preventDefault()
  try {
    const res = await axios.post('/api/v1/auth/register',
       {name,email,password,phone,address});
       
  if(res.data.success){
    toast.success(res.data.message)
    navigate('/login')
  }    

  } catch (error) {
    console.log(error)
    toast.error('Something went wrong')
  }
}

return (
  <Layout title="Register Page">
    <div className="register">
    <form onSubmit={handleSubmit}>

  <div className="mb-3">
    
    <input type="name" value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="exampleInputEmail1" placeholder="Enter your Name" required/>
  </div>

  <div className="mb-3">
    
    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder="Enter your Email" required />
  </div>

  <div className="mb-3">
    
    <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1"placeholder="Enter your Password " required />
  </div>

  <div className="mb-3">
   
    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder="Enter your Phone" required/>
  </div>

  <div className="mb-3">
    
    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder="Enter your Address" required />
  </div>
  

  <button type="submit" className="btn btn-primary">Submit</button>

</form>
    </div>
  </Layout>
);
};

export default Register;
