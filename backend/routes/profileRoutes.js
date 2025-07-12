const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/User');

const router = express.Router();

// Fetch User Profile
router.get('/', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // Exclude password
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
});

// Update User Profile
router.put('/', authMiddleware, async (req, res) => {
    const { name, location, profilePhoto, skillsOffered, skillsWanted, availability, isPublic } = req.body;

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update fields
        user.name = name || user.name;
        user.location = location || user.location;
        user.profilePhoto = profilePhoto || user.profilePhoto;
        user.skillsOffered = skillsOffered || user.skillsOffered;
        user.skillsWanted = skillsWanted || user.skillsWanted;
        user.availability = availability || user.availability;
        user.isPublic = isPublic !== undefined ? isPublic : user.isPublic;

        await user.save();
        res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
});

module.exports = router;