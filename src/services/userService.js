import axios from "axios";

// Use environment variable for API base URL
const API_URL =
  import.meta.env.VITE_API_BASE_URL || "https://shaadi-server.onrender.com/api";

// Register user (multipart/form-data)
export const registerUser = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/users/register`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get all users (Admin)
export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get single user by ID
export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
