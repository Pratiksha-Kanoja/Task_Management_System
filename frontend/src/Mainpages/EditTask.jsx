import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast';
import axios from 'axios';
import './Addtask.css';

const Edittask = () => {
    const [editTask, setEditTask] = useState({});
    const { id } = useParams();
    const router = useNavigate();

    
    // Fetch existing task data from the backend
    async function getTask() {
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/task/get-single-task?id=${id}`)
            if (response.data.success) {
                setEditTask(response.data.task)
            }
        } catch (error) {
            console.log(error)
        }
    }

    // Handle input changes for the form fields
    function handleChange(event) {
        setEditTask({ ...editTask, [event.target.name]: event.target.value })
    }

    // Submit edited data to the backend
    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/v1/task/edit-task', { editTask })
            if (response.data.success) {
                toast.success(response.data.message)
                router('/viewtask')
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }

    }

    // Fetch task data when the component mounts, if an 'id' is provided
    useEffect(() => {
        if (id) {
            getTask()
        }
    }, [id])

    return (
        <div className='addtask_container'>
            <form onSubmit={handleSubmit} >
                <p>Edit Task</p>
                <label>Title :</label>
                <br />
                <input type='text' onChange={handleChange} value={editTask.title} name='title' />

                <br />

                <label>Description:</label>
                <br />
                {/* <input type='text' onChange={handleChange} value={editTask.description} name='description' /><br /> */}
                <textarea name="description" onChange={handleChange} value={editTask.description}></textarea>
                <br />
                <button>Edit</button>
            </form>
        </div>
    )
}

export default Edittask