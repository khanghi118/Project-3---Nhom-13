import React,{useState,useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { LuLogIn } from 'react-icons/lu'

const Spinner = () => {
  const [count, setCount] = useState(5)
    const navigate = useNavigate()
    const location = useLocation()
    useEffect(()=>{
      const interval = setInterval(()=> {
        setCount((prevValue)=> --prevValue)
      },1000)
      count === 0 && navigate('/login',{
        state: location.pathname
      })
      return () => clearInterval(interval)
    }, [count,navigate])
  return (
    <> 
        <div className="d-flex justify-content-center align-items-center" style={{height:"70vh"}}>
          <h1 className="Text-center">Please wait in <LuLogIn></LuLogIn> {count}  </h1>
  <div className="spinner-border" role="status">
    <span className="visually-hidden">Loading...</span>
    
  </div>
</div>



    </>
  )
}








export default Spinner