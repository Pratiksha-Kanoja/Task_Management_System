import Router from 'express'
import { Login, Register, getCurrentUser } from '../Controllers/Auth.controllers.js';

// Creating a new instance of the Express router
const Authrouter = Router();

// Route for user login
Authrouter.post('/login',Login);

// Route for user registration
Authrouter.post('/register',Register);

// Route to get the current user
Authrouter.post('/get-current-user',getCurrentUser);

export default Authrouter;
