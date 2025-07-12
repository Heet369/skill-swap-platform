const mongoose = require('mongoose');

// Define User schema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        default: null,
    },
    profilePhoto: {
        type: String,
        default: null,
    },
    skillsOffered: {
        type: [String],
        required: true,
    },
    skillsWanted: {
        type: [String],
        required: true,
    },
    availability: {
        type: [String], // Example: ["weekends", "evenings"]
        required: true,
    },
    isPublic: {
        type: Boolean,
        default: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('User', UserSchema);