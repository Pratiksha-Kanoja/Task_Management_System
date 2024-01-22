import axios from 'axios';
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext';

const Login = () => {

  const router = useNavigate();

  const [userLogin, setUserLogin] = useState({ email: "", password: "" });
  const { Login, state } = useContext(AuthContext)

  // Function to handle input changes
  function handlechange(event) {
    setUserLogin({ ...userLogin, [event.target.name]: event.target.value })
  }

  // Function to handle form submission
  async function handlesubmit(event) {
    event.preventDefault();
    try {
      // Making a POST request to the login API endpoint
      const { data } = await axios.post('http://localhost:8000/api/v1/auth/login', { userLogin })

      // Checking if the login was successful
      if (data.success) {

        // Storing the authentication token in local storage
        localStorage.setItem("my-token", JSON.stringify(data.token))

        // Calling the Login function from the authentication context to update the authentication state
        Login(data.user);

        // Displaying a success toast notification
        toast.success("Login successfull.")

        // Clearing the user login information in the state
        setUserLogin({ email: "", password: "" })

        // Navigating to the home page
        router("/")
      } else {
        // If the login was not successful, throw an error
        throw new Error("Something went wrong..")
      }

    } catch (error) {
      // Displaying an error toast notification if there is an error
      toast.error(error.message)
    }
  }
  return (
    <div className='addtask_container'>
      <form onSubmit={handlesubmit}>
        <p>Login Form</p>

        <label htmlFor="title">Email:</label>
        <br />
        <input type="email" name='email' onChange={handlechange} />

        <br />

        <label htmlFor="password">Password:</label>
        <br />
        <input type='password' name="password" onChange={handlechange} />

        <br />

        <button>Login</button>

        <p style={{ marginBottom: "30px" }}>Not member? <span onClick={() => router('/userregister')}>Signup Now</span></p>
      </form>
    </div>
  )
}

export default Login