import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/v1';

// You can set up a base Axios instance to include common configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  // You can add more settings here like headers, etc.
});

// Example API function to get dashboard data
export const getDashboardData = async () => {
  try {
    const response = await apiClient.get('/dashboard');
    return response.data;
  } catch (error) {
    // Handle the error accordingly
    console.error('Error fetching dashboard data:', error);
    throw error;
  }
};

// More API functions can be added here for different endpoints