import React, { useState, useEffect } from 'react';
import '../styles/Profile.css'; // Custom styles
import axios from 'axios';

function ProfilePage() {
    const [profile, setProfile] = useState({
        id: '', // MongoDB ID
        name: '',
        location: '',
        skillsOffered: [],
        skillsWanted: [],
        availability: '',
        profileType: 'Public',
    });

    const [editing, setEditing] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/profile/list'); // Example fetch
                setProfile(data[0]); // Assume user profile is the first one
            } catch (error) {
                console.error('Failed to fetch profile:', error);
            }
        };

        fetchProfile();
    }, []);

    const handleSave = async () => {
        try {
            await axios.post('http://localhost:5000/api/profile/update', { id: profile.id, updates: profile });
            alert('Profile updated successfully!');
            setEditing(false);
        } catch (error) {
            console.error('Failed to update profile:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    return (
        <div className="profile-container">
            <div className="profile-header">
                <button className="btn-save" onClick={handleSave} disabled={!editing}>
                    Save
                </button>
                <button className="btn-discard" onClick={() => setEditing(false)} disabled={!editing}>
                    Discard
                </button>
            </div>
            <div className="profile-body">
                <div className="profile-field">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={profile.name}
                        onChange={handleChange}
                        disabled={!editing}
                    />
                </div>
                <div className="profile-field">
                    <label>Location</label>
                    <input
                        type="text"
                        name="location"
                        value={profile.location}
                        onChange={handleChange}
                        disabled={!editing}
                    />
                </div>
                {/* Add other fields */}
            </div>
        </div>
    );
}

export default ProfilePage;