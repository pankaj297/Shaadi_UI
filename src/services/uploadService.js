import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await axios.post(`${API_URL}/upload/image`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data.url; // ✅ अब Cloudinary URL मिलेगा
  } catch (error) {
    console.error("Upload failed:", error.response?.data || error.message);
    throw error;
  }
};
