import axios from 'axios';

const API_URL = 'http://localhost:5000/api/requests';

// Fetch user's swap requests
export const getMyRequests = async () => {
  try {
    const response = await axios.get(`${API_URL}/my-requests`);
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to fetch requests');
  }
};

// Respond to a swap request
export const respondToRequest = async (id, action) => {
  try {
    const response = await axios.post(`${API_URL}/respond`, { id, action });
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to respond to request');
  }
};

// Cancel a swap request
export const cancelRequest = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/cancel/${id}`);
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to cancel request');
  }
};