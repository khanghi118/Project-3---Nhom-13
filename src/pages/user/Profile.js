import React,{useState, useEffect} from 'react'
import Layout from "./../../components/Layout/Layout"
import UserMenu from "../../components/Layout/UserMenu"
import { useAuth } from '../../context/auth'
import toast from "react-hot-toast";
import axios from 'axios'


const Profile = () => {
  const [auth, setAuth] = useAuth()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")

  useEffect(() => {
    const { email, name, phone, address } = auth?.user ?? {};
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
  }, [auth?.user]);
  

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const {data} = await axios.put("/api/v1/auth/profile",
         {name,email,password,phone,address});
         
         if (data?.errro) {
          toast.error(data?.error);
        } else {
          setAuth({ ...auth, user: data?.updatedUser });
          let ls = localStorage.getItem("auth");
          ls = JSON.parse(ls);
          ls.user = data.updatedUser;
          localStorage.setItem("auth", JSON.stringify(ls));
          toast.success("Profile Updated Successfully");
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    };
  
    
  return (
    <Layout title={"Your Profile"}>
        <div className="container-fluid m-3 p-3">
        <div className="row">
        <div className="col-md-3">
            <UserMenu/>
            </div>
            <div className="col-md-9">
            <div className="register" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', backgroundColor: '' }}>
  <h1>User Profile</h1>

  <form style={{ width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit}>
    <div className="mb-3" style={{ marginBottom: '15px' }}>
      <input type="name" value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="exampleInputEmail1" placeholder="Enter your Name" style={{ width: '100%', padding: '10px', border: 'none', borderRadius: '5px', backgroundColor: '#f0f0f0', fontSize: '16px', transition: 'background-color 0.3s' }} required />
    </div>

    <div className="mb-3" style={{ marginBottom: '15px' }}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder="Enter your Email" style={{ width: '100%', padding: '10px', border: 'none', borderRadius: '5px', backgroundColor: '#f0f0f0', fontSize: '16px', transition: 'background-color 0.3s' }} required disabled />
    </div>

    <div className="mb-3" style={{ marginBottom: '15px' }}>
      <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder="Enter your Password " style={{ width: '100%', padding: '10px', border: 'none', borderRadius: '5px', backgroundColor: '#f0f0f0', fontSize: '16px', transition: 'background-color 0.3s' }} required />
    </div>

    <div className="mb-3" style={{ marginBottom: '15px' }}>
      <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder="Enter your Phone" style={{ width: '100%', padding: '10px', border: 'none', borderRadius: '5px', backgroundColor: '#f0f0f0', fontSize: '16px', transition: 'background-color 0.3s' }} required />
    </div>

    <div className="mb-3" style={{ marginBottom: '15px' }}>
      <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder="Enter your Address" style={{ width: '100%', padding: '10px', border: 'none', borderRadius: '5px', backgroundColor: '#f0f0f0', fontSize: '16px', transition: 'background-color 0.3s' }} required />
    </div>

    

    <button type="submit" className="btn btn-primary" style={{ padding: '10px', border: 'none', borderRadius: '5px', backgroundColor: 'black', color: '#fff', fontSize: '16px', cursor: 'pointer', transition: 'background-color 0.3s' }}>Update</button>
  </form>
</div>
                </div>
                </div>
            </div>

    </Layout>
  )
}

export default Profile