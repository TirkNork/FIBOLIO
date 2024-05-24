import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../../components/Button/Button.jsx';
import axios from 'axios';
import './Changepass_Teacher.css';
import { FaUser, FaEye, FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Changepass = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { email } = location.state || {};

    const handleBackClick = () => {
        navigate('/login');
    };

    const handleSaveChange = async (e) => {
        e.preventDefault();
        const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\w@><#$(){}\[\]]{8,}$/;

        if (password !== confirmPassword) {
            setMessage("Passwords don't match");
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 3000);
            return;
        }

        if (!passwordPattern.test(password)) {
            setMessage('Password must contain at least one digit, one lowercase letter, one uppercase letter, and be at least 8 characters long.');
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 3000);
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/change-passwordT', { email, password });
            setMessage(response.data.message);
            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false);
                if (response.data.success) {
                    navigate('/login');
                }
            }, 3000);
        } catch (error) {
            setMessage(error.response.data.message);
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 3000);
        }
    };

    return (
        <div className='Contain6'>
            <form onSubmit={handleSaveChange}>
                <div className="white-box"></div>
                <h1>Change password</h1>

                {showNotification && (
                    <div className="popup">
                        {message}
                    </div>
                )}

                <div className="Create">
                    <p>Create New Password</p>
                </div>

                <div className="input-boxpassnew">
                    <input
                        type="password"
                        placeholder=' '
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="Confirm">
                    <p>Confirm New Password</p>
                </div>

                <div className="input-boxpassconfirm">
                    <input
                        type="password"
                        placeholder=' '
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                <div className="Save">
                        <Button type="submit" label="Save Change & Continue" />
                </div>

                <div className="Back">
                        <Button type="submit" onClick={handleBackClick} label="Cancel" />
                </div>
  
            </form>
        </div>
    );
};

export default Changepass;
