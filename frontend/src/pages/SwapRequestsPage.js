import { useEffect, useState, useCallback } from 'react';
import { getMyRequests, respondToRequest, cancelRequest } from '../services/requestService';
import { toast } from 'react-toastify';

const SwapRequestPage = () => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = useCallback(async () => {
    try {
      const res = await getMyRequests();
      setRequests(res || []);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load requests');
    }
  }, []);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const handleRespond = async (id, action) => {
    try {
      await respondToRequest(id, action);
      toast.success(`Request ${action}ed`);
      fetchRequests();
    } catch (err) {
      console.error(err);
      toast.error('Failed to update request');
    }
  };

  const handleCancel = async (id) => {
    try {
      await cancelRequest(id);
      toast.success('Request canceled');
      fetchRequests();
    } catch (err) {
      console.error(err);
      toast.error('Failed to cancel request');
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-teal-400 mb-6 text-center">Swap Requests</h1>

        {requests.length === 0 ? (
          <p className="text-gray-400 text-center">No requests yet.</p>
        ) : (
          <div className="space-y-4">
            {requests.map((req) => (
              <div
                key={req._id}
                className="bg-gray-900 p-4 rounded-xl border border-gray-800 shadow hover:shadow-lg transition"
              >
                <p className="text-sm text-gray-300">
                  <strong>From:</strong> {req.from.name} <br />
                  <strong>To:</strong> {req.to.name}
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  <strong>Message:</strong> {req.message}
                </p>
                <p className="text-sm mt-2">
                  <strong>Status:</strong>{' '}
                  <span
                    className={`px-2 py-1 rounded ${
                      req.status === 'pending'
                        ? 'bg-yellow-600 text-white'
                        : req.status === 'accepted'
                        ? 'bg-green-600 text-white'
                        : 'bg-red-600 text-white'
                    }`}
                  >
                    {req.status}
                  </span>
                </p>

                {/* Action buttons */}
                <div className="mt-4 flex gap-2">
                  {req.status === 'pending' && req.isReceiver && (
                    <>
                      <button
                        onClick={() => handleRespond(req._id, 'accept')}
                        className="px-4 py-1 rounded bg-green-600 hover:bg-green-500"
                        aria-label={`Accept request from ${req.from.name}`}
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleRespond(req._id, 'reject')}
                        className="px-4 py-1 rounded bg-red-600 hover:bg-red-500"
                        aria-label={`Reject request from ${req.from.name}`}
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {req.status === 'pending' && !req.isReceiver && (
                    <button
                      onClick={() => handleCancel(req._id)}
                      className="px-4 py-1 rounded bg-yellow-600 hover:bg-yellow-500"
                      aria-label={`Cancel request to ${req.to.name}`}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SwapRequestPage;