import { createContext, useEffect, useReducer } from "react";
import toast from "react-hot-toast";
import axios from "axios";

// Create a context to manage authentication state
export const AuthContext = createContext();

// Define the reducer function to handle state changes
const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { ...state, user: action.payload }
        case "LOGOUT":
            return { ...state, user: null }
        default:
            return state;
    }
}

// Parent component for managing authentication state
const ParentAuthContext = ({ children }) => {

    // Initial state for the authentication context
    const initialState = { user: null }

    // Use reducer hook to manage state changes
    const [state, dispatch] = useReducer(reducer, initialState)

    // Function to handle user login
    const Login = (data) => {
        dispatch({ type: "LOGIN", payload: data })
    }

    // Function to handle user logout
    const Logout = () => {

        // Remove token from local storage
        localStorage.removeItem("my-token")
        // Dispatch logout action
        dispatch({ type: "LOGOUT" })
        toast.success("Logout successfully")
    }

    // Effect to run on component mount to check if the user is already authenticated
    useEffect(() => {

        // async function to get the current user using the stored token
        async function getCurrentUser() {
            try {
                const response = await axios.post('http://localhost:8000/api/v1/auth/get-current-user', { token })
                if (response.data.success) {
                    console.log(response.data.user, "response.data.user")
                    Login(response.data.user)
                }
            } catch (error) {
                toast.error(error.response.data.message)
            }
        }

        // Retrieve the stored token from local storage
        const token = JSON.parse(localStorage.getItem("my-token"))

        // If a token exists, attempt to fetch the current user
        if (token) {
            getCurrentUser()
        }

    }, [])


    // Provide the authentication context to the child components
    return (
        <AuthContext.Provider value={{ state, Login, Logout }}>
            {children}
        </AuthContext.Provider>
    )
}


export default ParentAuthContext;