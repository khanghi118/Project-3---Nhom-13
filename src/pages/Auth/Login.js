import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate,useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth";


const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [auth, setAuth] = useAuth()

  const navigate = useNavigate()
  const location = useLocation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("/api/v1/auth/login",
         {email,password});
         
    if(res.data.success){
      toast.success(res.data.message)
      setAuth({
        ...auth,
        user: res.data.user,
        token: res.data.token,
      })
      localStorage.setItem("auth", JSON.stringify(res.data));
      navigate(location.state || "/")
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
      <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder="Enter your Password " style={{ width: '100%', padding: '10px', border: 'none', borderRadius: '5px', backgroundColor: '#f0f0f0', fontSize: '16px', transition: 'background-color 0.3s' }} required />
    </div>


    <button type="submit" className="btn btn-primary" style={{ padding: '10px', border: 'none', borderRadius: '5px', backgroundColor: 'black', color: '#fff', fontSize: '16px', cursor: 'pointer', transition: 'background-color 0.3s' }}>Login</button>
  </form>
</div>

  </Layout>
  )
}

export default Login