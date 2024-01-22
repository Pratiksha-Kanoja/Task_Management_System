import React, { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const[register,setRegister] = useState({name:"",email:"",password:""});

    const router = useNavigate();

    // Function to handle input changes
    function handlechange(event){
        setRegister({...register,[event.target.name]:event.target.value})
    }

    // Function to handle form submission
    async function handlesubmit(event){
        event.preventDefault();

        try {
           // Making a POST request to the registration API endpoint
            const {data} = await axios.post('http://localhost:8000/api/v1/auth/register',{ name:register.name, email:register.email, password:register.password } )

             // Making a POST request to the registration API endpoint
            if(data.success){
                // Displaying a success toast message
                toast.success(data.message)

                // Resetting the registration form fields
                setRegister({name:"",email:"",password:""})
            }
        } catch (error) {
            // Displaying an error toast message if the registration fails
            toast.error(error.message)
        }
    }


  return (
    <div className='addtask_container'>
      <form onSubmit={handlesubmit}>
        <p>Registration Form</p>

        <label htmlFor="name">Name:</label>
        <br />
        <input type="text" name='name' onChange={handlechange} value={register.name}/>

        <label htmlFor="title">Email:</label>
        <br />
        <input type="email" name='email' onChange={handlechange} value={register.email}/>

        <br/>

        <label htmlFor="password">Password:</label>
        <br/>
        <input type='password' name="password" onChange={handlechange}  value={register.password}/>

        <br/>

        <button>Register</button>

        <p style={{marginBottom:"30px"}}>Already have an account? <span onClick={()=>router('/userlogin')}>Signin</span></p>
      </form>
    </div>
  )
}

export default Register