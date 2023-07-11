import React from 'react'
import react, { useState } from "react";
import Layout from '../../components/Layout/Layout'
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate} from "react-router-dom";
import { useAuth } from "../../context/auth";


const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [answer, setAnswer] = useState("")
  
    const navigate = useNavigate()
  
    const handleSubmit = async (e) => {
      e.preventDefault()
      try {
        const res = await axios.post("/api/v1/auth/forgot-password",
           {email,newPassword,answer});
           
      if(res.data.success){
        toast.success(res.data.message)
        
        navigate("/login")
      }else{
        toast.error(res.data.message)
      }    
    
      } catch (error) {
        console.log(error)
        toast.error('Something went wrong')
      }
    }
    return (
      <Layout title="Register Page">
      <div className="register" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', backgroundColor: '' }}>
    <img src="./images/account-portal-page-inline.png" style={{ width: '100%', maxWidth: '500px', height: 'auto', marginBottom: '20px' }}/>
    <h1>Sign in or sign up (it's free)</h1>
  
    <form style={{ width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit}>
      
  
      <div className="mb-3" style={{ marginBottom: '15px' }}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder="Enter your Email" style={{ width: '100%', padding: '10px', border: 'none', borderRadius: '5px', backgroundColor: '#f0f0f0', fontSize: '16px', transition: 'background-color 0.3s' }} required />
      </div>

      <div className="mb-3" style={{ marginBottom: '15px' }}>
        <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder="Enter your Secert Answer" style={{ width: '100%', padding: '10px', border: 'none', borderRadius: '5px', backgroundColor: '#f0f0f0', fontSize: '16px', transition: 'background-color 0.3s' }} required />
      </div>
  
   

      <div className="mb-3" style={{ marginBottom: '15px' }}>
        <input type="text" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder="Enter your Password " style={{ width: '100%', padding: '10px', border: 'none', borderRadius: '5px', backgroundColor: '#f0f0f0', fontSize: '16px', transition: 'background-color 0.3s' }} required />
      </div>
      <button type="submit" className="btn btn-primary" style={{ padding: '10px', border: 'none', borderRadius: '5px', backgroundColor: 'black', color: '#fff', fontSize: '16px', cursor: 'pointer', transition: 'background-color 0.3s' }}>Reset Password</button>
    </form>
  </div>
  
    </Layout>
    )
  }

export default ForgotPassword