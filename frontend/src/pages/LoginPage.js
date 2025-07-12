import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import { saveToken } from '../utils/tokenUtils';
import '../styles/Auth.css'; // Custom styles for login/signup pages

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const data = await login(email, password);
            saveToken(data.token);
            navigate('/profile');
        } catch (error) {
            alert(error.message || 'Login failed');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h2 className="auth-title">Login</h2>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary btn-block" onClick={handleLogin}>
                    Login
                </button>
                <p className="auth-footer">
                    Don't have an account? <span onClick={() => navigate('/register')}>Sign Up</span>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;