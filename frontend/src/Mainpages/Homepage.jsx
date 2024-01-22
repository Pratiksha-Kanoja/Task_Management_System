import React, {useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import './Homepage.css'
import { AuthContext } from '../Context/AuthContext';

const Homepage = () => {
    const router = useNavigate();
    const{state, Logout} = useContext(AuthContext)
  return (
    <div className='Homepage_container'>
        <p>Task Management System</p>
        <h1>Welcome {state?.user?.name}</h1>
        <button onClick={()=>router('/addtask')}>Add Task</button>
        <button onClick={()=>router('/viewtask')}>View Task</button>
        <button onClick={()=>router('/userlogin')}>Login</button>
        <button onClick={Logout}>Logout ?</button>
        <button onClick={()=>router('/userregister')}>Registration</button>
    </div>
  )
}

export default Homepage