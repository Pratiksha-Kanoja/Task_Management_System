import AuthModels from "../Models/Auth.models.js";
import bcrypt from 'bcrypt';
import Jwt from "jsonwebtoken";

/**
 * @route POST /api/v1/auth/register
 * @description Register a new user
 * @access Public
 * 
 * @param {string} name - User's name
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * 
 * @returns {object} - Object containing the newly registered user's information
 * @throws {object} - Object containing an error message if registration fails
 */

export const Register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if all required fields are present
        if (!name || !email || !password) return res.status(404).json({ success: false, message: "All fields are mandatory" })

        // Hash the password using bcrypt
        const hashedpassword = await bcrypt.hash(password, 10);

        // Create a new user model with the hashed password
        const auth = new AuthModels({
            name,
            email,
            password: hashedpassword
        })

        // Save the user to the database
        await auth.save();

        return res.status(200).json({success:true,message:"Register Successfully"})

    } catch (error) {
        return res.status(500).json({ success: false, message: error })
    }
}


/**
 * @route POST /api/v1/auth/login
 * @description User login
 * @access Public
 *
 * @param {string} email - User's email address
 * @param {string} password - User's password
 *
 * @returns {object} An object containing user information and authentication token
 *
 * @example
 * {
 *    "email": "user@example.com",
 *    "password": "userpassword",
 * }
 *
 * @throws {401} Unauthorized - Invalid credentials
 * @throws {500} InternalServerError - Server error
 */


export const Login = async(req, res) => {
    try {
        const{email,password} = req.body.userLogin;

        if(!email || !password) return res.status(404).json({success:false,message:"All fields are mandatory"})

        // Find the user in the database based on the provided email
        const user = await AuthModels.findOne({ email: email });
        
        if(!user)return res.status(401).json({success: false, message: "Email is wrong."})

        // Compare the provided password with the hashed password in the database
        const isPasswordcorrect = await bcrypt.compare(password,user.password);

        // If password is incorrect, return an unauthorized response
        if(!isPasswordcorrect){
            return res.status(401).json({success:false,message:"Password is wrong"})
        }

        // here we generate a JWT for a user based on their ID and a secret key
        const token = await Jwt.sign({id : user._id},process.env.JWT_SECRET)

        return res.status(200).json({success: true,message:"Login Successfull",user : {name : user.name,id:user._id},token})

    } catch (error) {
        return res.status(500).json({success:false,message:error})
    }
}


/**
 * @route POST /api/v1/auth/getCurrentUser
 * @description Get the details of the currently authenticated user
 * @access Private
 *
 * @param {string} token - The authentication token obtained during login
 *
 * @returns {object} Response object
 *   - success {boolean} - Indicates whether the operation was successful
 *   - user {object} - User details
 *      - name {string} - User's name
 *      - id {string} - User's unique identifier
 *   - message {string} - Additional information in case of success or failure
 *
 * @throws {object} Response object
 *   - success {boolean} - Indicates whether the operation was successful
 *   - message {string} - Error message in case of failure
 */

export const getCurrentUser = async (req, res) => {
    try{
        // Extract token from the request body
        const { token } = req.body;

        // Check if token is provided
        if(!token) return res.status(401).json({success:false,message:"Token is required."})

         // Verify the token and extract user ID
        const {id} = await Jwt.verify(token,process.env.JWT_SECRET)

        // Find the user in the database based on the extracted ID
        const user = await AuthModels.findById(id);

        if(!user) return res.status(401).json({success:false,message:"User not found."})

        return res.status(200).json({success:true , user:{name:user.name,id:user._id}})

    }catch(error){
        return res.status(500).json({success:false , message: error })
    }
}