import TaskModels from "../Models/Task.models.js";

/**
 * @route POST /api/v1/task/add-task
 * @description Add a new task
 * @access Public
 * 
 * @param {string} title - The title of the task.
 * @param {string} description - The description of the task.
 * @param {string} id - The user ID associated with the task.
 * 
 * @returns {Object} - JSON response indicating the success or failure of the operation.
 *   - success (boolean): Indicates whether the task was added successfully.
 *   - message (string): A message providing additional information about the operation.
 */

export const AddTask = async(req,res) =>{
    try {

        // Extract title, description, and id from the request body
        const{title, description,id} = req.body;

        // Check if title or description is missing
        if(!title || !description){
            return res.status(404).json({success:false,message:"All field are mandatory"})
        }

        // Create a new TaskModel instance
        const task = new TaskModels({
            title, description,userId:id
        })

        // Save the task to the database
        await task.save();
        return res.status(200).json({success:true,message:"Task added successfully"})
        
    } catch (error) {
        return res.status(500).json({success:false,message:error})
    }
}


/**
 * @route POST /api/v1/task/view-task
 * @description Get all tasks
 * @access Public
 * 
 */

export const ViewTask = async(req,res) =>{
    try {
        // Find all tasks in the database
        const task = await TaskModels.find();

        // Check if tasks are present
        if(task.length){
            return res.status(200).json({success:true,message:"Your task",task:task})
        }
        // Return response if no tasks are present
        return res.status(404).json({success:false,message:"No task present please add task and view it here"})
    } catch (error) {
        return res.status(500).json({success:false,message:error})
    }
}

/**
 * @route GET /api/v1/task/get-single-task:id
 * @description Get a single task by ID
 * @param {string} id - The ID of the task to retrieve
 * @access Public
 */

export const GetSingleTask = async(req,res) =>{
    try {

        // Extract the TaskID from the query parameters
        const {id:TaskID} = req.query;

        // Check if TaskID is missing
        if(!TaskID) return res.status(404).json({success:false,message:"TaskID required"})

        // Find the task by its ID
        const task = await TaskModels.findById(TaskID)

        // Check if the task is found
        if(task){
            return res.status(200).json({success:true,task})
        }

        // Return response if the task is not found
        return res.status(404).json({success:false,message:"Task not found",task})

    } catch (error) {
        return res.status(500).json({success:false,message:error})
    }
}

/**
 * @route POST /api/v1/task/edit-task
 * @description Edit a task by updating its title and description
 * @access Private 
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {Object} - The response containing the success status and a message.
 *
 */

export const EditTask = async(req,res) =>{
    try {
        // Extract title, description, and _id from the request body
        const{title, description, _id} = req.body.editTask;

        // Check if title, description, or _id is missing
        if(!title || !description || !_id) return res.status(404).json({success:true,message:"All fields are mandatory"})

        // Update the task in the database
        await TaskModels.findByIdAndUpdate(_id,{title, description});

        return res.status(200).json({ success: true, message: "Task Edit successfully." })
    } catch (error) {
        return res.status(500).json({success:false,message:error})
    }
}

/**
 * @route POST /api/v1/tasks/delete-task:id
 * @description Delete a task by ID
 * @param {string} id - The ID of the task to be deleted
 * @access Private
 */

export const DeleteTask = async(req,res) =>{
    try {
        // Extract the TaskID from the query parameters
        const {id} = req.query;

        // Check if TaskID is missing
        if(!id) return res.status(404).json({success:false,message:"TaskID required"})

        // Delete the task from the database
        await TaskModels.findByIdAndDelete(id);

        // Return success response
        return res.status(200).json({ success: true, message: "Task Delete successfully." })
    } catch (error) {

         // Handle any errors that occur during execution
        return res.status(500).json({success:false,message:error})
    }
}