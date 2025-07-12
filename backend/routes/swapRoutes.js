const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const SwapRequest = require('../models/SwapRequest');

const router = express.Router();

// Create a Swap Request
router.post('/', authMiddleware, async (req, res) => {
    const { receiverId, skillOffered, skillWanted } = req.body;

    try {
        const swapRequest = new SwapRequest({
            sender: req.user.id,
            receiver: receiverId,
            skillOffered,
            skillWanted,
        });

        await swapRequest.save();
        res.status(201).json({ message: 'Swap request sent successfully', swapRequest });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
});

// Get Swap Requests (sent and received)
router.get('/', authMiddleware, async (req, res) => {
    try {
        const sentRequests = await SwapRequest.find({ sender: req.user.id }).populate('receiver', 'name email');
        const receivedRequests = await SwapRequest.find({ receiver: req.user.id }).populate('sender', 'name email');

        res.status(200).json({ sentRequests, receivedRequests });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
});

// Accept or Reject a Swap Request
router.put('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const swapRequest = await SwapRequest.findById(id);

        if (!swapRequest) {
            return res.status(404).json({ message: 'Swap request not found' });
        }

        if (swapRequest.receiver.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to change this request' });
        }

        if (!['accepted', 'rejected'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }

        swapRequest.status = status;
        await swapRequest.save();

        res.status(200).json({ message: `Swap request ${status} successfully`, swapRequest });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
});

// Delete a Swap Request
router.delete('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;

    try {
        const swapRequest = await SwapRequest.findById(id);

        if (!swapRequest) {
            return res.status(404).json({ message: 'Swap request not found' });
        }

        if (swapRequest.sender.toString() !== req.user.id && swapRequest.receiver.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to delete this request' });
        }

        await swapRequest.deleteOne();
        res.status(200).json({ message: 'Swap request deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
});

module.exports = router;