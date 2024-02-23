import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
apiClient.interceptors.request.use(
    config => {
      // Perform actions before the request is sent, like adding authorization tokens
      // config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
  
  // Response Interceptor
  apiClient.interceptors.response.use(
    response => {
      // Any status code within the range of 2xx causes this function to trigger
      return response;
    },
    error => {
      // Any status codes outside the range of 2xx cause this function to trigger
  
      // Handle common errors globally
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Backend returned status code:", error.response.status);
        console.error("Response data:", error.response.data);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error", error.message);
      }
  
      return Promise.reject(error);
    }
  );
  
  export default apiClient;