import express,{json} from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cors from 'cors';
// Import your router from the Routes directory
import router from "./Routes/index.js";

// Create an instance of the Express application
const app = express();
// Load environment variables from the .env file
dotenv.config();
// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());
// Parse incoming JSON requests
app.use(express.json())


// Use the defined router for routes starting with '/api/v1'
app.use('/api/v1',router);

// Connect to the MongoDB database using the provided URL
mongoose.connect(process.env.MONGOURL).then(()=>console.log("Database connected"))

// Start the server and listen on port 8000
app.listen(8000,()=>console.log("Server is running on port 8000"))



 