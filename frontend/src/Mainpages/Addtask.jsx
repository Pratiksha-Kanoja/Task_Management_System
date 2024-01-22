import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import axios from 'axios';
import './Addtask.css'
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Addtask = () => {

  const [addTask, setAddTask] = useState({ title: "", description: "" });
  const { state } = useContext(AuthContext)
  const router = useNavigate();

  // Handle input changes
  function handlechange(event) {
    setAddTask({ ...addTask, [event.target.name]: event.target.value })
  }

  // Handle form submission
  async function handlesubmit(event) {

    event.preventDefault();

    // Check if title and description are provided
    if (addTask.title && addTask.description) {

      try {
        
        // Send a POST request to add a new task
        const { data } = await axios.post("http://localhost:8000/api/v1/task/add-task", { title: addTask.title, description: addTask.description, id: state?.user?.id })

        // If the request is successful, redirect to viewtask page and show success toast
        if (data.success) {
          router('/viewtask')
          toast.success(data.message)
          setAddTask({ title: "", description: "" })
        }
      } catch (error) {
        // Handle error and show error toast
        toast.error(error.message)
      }
    } else {
      // If title or description is missing, show an error toast
      toast.error("All fields are mandtory.")
    }
  }

  // Check if the user is authenticated, if not, redirect to login page
  useEffect(() => {

    if (!state?.user) {
      router('/userlogin')
      toast.error("Please login to acceess this page.")
    }
  }, [state])

  return (
    <div className='addtask_container'>
      <form onSubmit={handlesubmit}>
        <p>Add Task</p>

        <label htmlFor="title">Title:</label>
        <br />
        <input type="text" name='title' onChange={handlechange} value={addTask.title} />

        <br />

        <label htmlFor="description">Description:</label>
        <br />
        <textarea name="description" onChange={handlechange} value={addTask.description}></textarea>

        <br />

        <button>Add Task</button>
      </form>
    </div>
  )
}

export default Addtask