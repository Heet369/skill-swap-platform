const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/User');
const SwapRequest = require('../models/SwapRequest');

const router = express.Router();

// Middleware to check admin role
const adminMiddleware = (req, res, next) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    next();
};

// Monitor Swaps
router.get('/swaps', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const swaps = await SwapRequest.find()
            .populate('sender', 'name email')
            .populate('receiver', 'name email');
        res.status(200).json(swaps);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
});

// Ban User
router.put('/ban-user/:id', authMiddleware, adminMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.isBanned = true;
        await user.save();
        res.status(200).json({ message: 'User banned successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
});

// Moderate Skill Descriptions
router.put('/moderate-skill/:userId', authMiddleware, adminMiddleware, async (req, res) => {
    const { userId } = req.params;
    const { skillsOffered, skillsWanted } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update skills
        user.skillsOffered = skillsOffered || user.skillsOffered;
        user.skillsWanted = skillsWanted || user.skillsWanted;

        await user.save();
        res.status(200).json({ message: 'Skills moderated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
});

// Send Platform-Wide Messages
router.post('/send-message', authMiddleware, adminMiddleware, async (req, res) => {
    const { message } = req.body;

    // Example: In production, you'd use a service like SendGrid or Twilio
    try {
        console.log('Platform-wide message:', message);
        res.status(200).json({ message: 'Message sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
});

// Download Reports
router.get('/download-reports', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const users = await User.find().select('name email skillsOffered skillsWanted');
        const swaps = await SwapRequest.find();
        
        // Example: Create a CSV or JSON report here
        const report = {
            users,
            swaps,
        };
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
});

module.exports = router;