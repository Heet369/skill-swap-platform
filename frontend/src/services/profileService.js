import axios from 'axios';

const API_URL = 'http://localhost:5000/api/profile';

// Fetch user profile
export const getProfile = async (token) => {
    try {
        const response = await axios.get(API_URL, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Update user profile
export const updateProfile = async (token, profileData) => {
    try {
        const response = await axios.put(API_URL, profileData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
export const getSingleProfile = async (userId) => {
  const res = await axios.get(`/api/profile/${userId}`);
  return res.data;
};