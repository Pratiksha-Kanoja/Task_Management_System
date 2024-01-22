import { Router } from "express";
import { AddTask, DeleteTask, EditTask, GetSingleTask, ViewTask } from "../Controllers/Task.controllers.js";

// Creating a new instance of the Express router
const taskrouter = Router();

// Route for add task
taskrouter.post('/add-task',AddTask);
// Route for view added task
taskrouter.post('/view-task',ViewTask);
// Route for get single task
taskrouter.get('/get-single-task',GetSingleTask);
// Route for edit existing task
taskrouter.post('/edit-task',EditTask);
// Route for delete task
taskrouter.post('/delete-task',DeleteTask);

export default taskrouter;