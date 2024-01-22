import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { RiDeleteBin5Line } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import './Viewtask.css'
import { LiaEditSolid } from "react-icons/lia";
import { AuthContext } from '../Context/AuthContext';

const Viewtask = () => {
  const [viewtask, setViewTask] = useState([]);

  const router = useNavigate();
  const { state } = useContext(AuthContext)

  // Function to fetch and display user tasks
  async function viewYourTask() {

    try {
      // Fetch tasks for the authenticated user
      const { data } = await axios.post("http://localhost:8000/api/v1/task/view-task",{ id: state?.user?.id })
      if (data.success) {
        setViewTask(data.task)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  // Function to delete a task
  async function DeleteTask(id) {
    try {
      // Send a request to delete the specified task
      const { data } = await axios.post(`http://localhost:8000/api/v1/task/delete-task?id=${id}`)
      if (data.success) {
        // Refresh the task list after deletion
        viewYourTask()
        toast.success(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  // useEffect to fetch tasks when the component mounts or user state changes
  
  useEffect(() => {
    // Redirect to login if the user is not authenticated
    if (!state?.user) {
        router('/userlogin')
        toast.error("Please login to access this page.")
    }

    // Fetch tasks if the user is authenticated
    if (state?.user && state?.user?.name !== undefined) {
        viewYourTask()
    }
}, [state])

  console.log(viewtask);

  return (
    <div className='viewtask_container'>
      {viewtask.length ?
        <div>
          {viewtask.map((task) => (
            <div>
              <p className='title'>{task.title}</p>
              <p>{task.description}</p>
              <div className='editdelete'>
                <div onClick={() => router(`/edittask/${task._id}`)}><LiaEditSolid style={{fontSize:"30px"}}/></div>
                <div onClick={() => DeleteTask(task._id)}><RiDeleteBin5Line style={{fontSize:"30px"}}/></div>
              </div>

            </div>
          ))}
        </div>
        :
        <div>Loading......</div>
      }
    </div>
  )
}

export default Viewtask