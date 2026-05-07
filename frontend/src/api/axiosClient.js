import axios from 'axios';
import toast from 'react-hot-toast';

// Create the base connection
const apiClient = axios.create({
    baseURL: 'http://localhost:3000', // Points to Express backend
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor: attach the JWT token to every request
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // store token here later
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Response Interceptor: Global Error Handler
apiClient.interceptors.response.use(
    (response) => {
        // If the request succeeds, pass it through
        return response;
    },
    (error) => {
        // If the backend is dead or unreachable
        if (!error.response) {
            toast.error("Network error! Make sure the backend is running.");
            return Promise.reject(error);
        }

        const status = error.response.status;
        const errorMessage = error.response.data?.message || "Something went wrong!";

        // If the user's token expired or they aren't allowed here
        if (status === 401 || status === 403) {
            toast.error("Session expired. Please log in again.");
            localStorage.removeItem('token'); // Clear the dead token
            window.location.href = '/login';  // Kick them back to the login page
        } 
        // For any other standard backend errors
        else {
            toast.error(errorMessage);
        }

        return Promise.reject(error);
    }
);

export default apiClient;