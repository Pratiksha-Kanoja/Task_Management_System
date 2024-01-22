import mongoose, {Schema} from 'mongoose';

// Define a schema for the 'auth' collection in MongoDB
const auth = new Schema({
    name:String,
    email:String,
    password:String
})

export default mongoose.model("auth",auth);