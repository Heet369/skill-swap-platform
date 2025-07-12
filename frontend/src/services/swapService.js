import axios from 'axios';
import { getMyRequests, respondToRequest, cancelRequest } from '../services/requestService';

const API_URL = 'http://localhost:5000/api/swap';

// Fetch swap requests
export const getSwapRequests = async (token) => {
    try {
        const response = await axios.get(API_URL, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Accept or reject a swap request
export const handleSwapRequest = async (token, requestId, status) => {
    try {
        const response = await axios.put(`${API_URL}/${requestId}`, { status }, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
