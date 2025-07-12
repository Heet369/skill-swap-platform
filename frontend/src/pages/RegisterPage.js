import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService';
import '../styles/Auth.css'; // Custom styles for login/signup pages

function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        location: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRegister = async () => {
        try {
            await register(formData);
            alert('Registration successful!');
            navigate('/login');
        } catch (error) {
            alert(error.message || 'Registration failed');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h2 className="auth-title">Sign Up</h2>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Enter a password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Location</label>
                    <input
                        type="text"
                        name="location"
                        className="form-control"
                        placeholder="Enter your location"
                        value={formData.location}
                        onChange={handleChange}
                    />
                </div>
                <button className="btn btn-primary btn-block" onClick={handleRegister}>
                    Sign Up
                </button>
                <p className="auth-footer">
                    Already have an account? <span onClick={() => navigate('/login')}>Login</span>
                </p>
            </div>
        </div>
    );
}

export default RegisterPage;