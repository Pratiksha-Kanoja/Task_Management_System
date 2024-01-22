import mongoose,{Schema} from 'mongoose'

// Define a schema for the 'Task' collection in MongoDB
const task = new Schema({
    title:String,
    description:String,
    userId: {
        type : mongoose.Schema.Types.ObjectId,
        ref :'User'
    }
})

export default mongoose.model("task",task)
