// File: src/services/userService.js
import axios from "axios";

// ✅ Correct base URL from environment variable
const API_URL = import.meta.env.VITE_API_BASE_URL + "/users";

// Register user (multipart/form-data)
export const registerUser = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Register failed:", error.response?.data || error.message);
    throw error;
  }
};

// Get all users (Admin)
export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/`);
    return response.data;
  } catch (error) {
    console.error(
      "Get all users failed:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Get single user by ID
export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Get user by ID failed:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Upload image to Cloudinary
export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/upload/image`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return res.data.url; // Cloudinary URL returned
  } catch (error) {
    console.error("Upload failed:", error.response?.data || error.message);
    throw error;
  }
};
