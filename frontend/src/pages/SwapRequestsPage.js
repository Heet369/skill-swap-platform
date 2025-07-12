import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SwapRequestsPage() {
    const [requests, setRequests] = useState({ sent: [], received: [] });

    const fetchSwapRequests = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/swap', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setRequests(response.data);
        } catch (error) {
            alert('Failed to fetch swap requests');
        }
    };

    useEffect(() => {
        fetchSwapRequests();
    }, []);

    return (
        <div>
            <h1>Swap Requests</h1>
            <h2>Sent Requests</h2>
            {requests.sent.map((req) => (
                <p key={req._id}>{req.skillOffered} for {req.skillWanted}</p>
            ))}
            <h2>Received Requests</h2>
            {requests.received.map((req) => (
                <p key={req._id}>{req.skillWanted} for {req.skillOffered}</p>
            ))}
        </div>
    );
}

export default SwapRequestsPage;