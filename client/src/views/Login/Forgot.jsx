import React, { useState } from 'react';
import axios from 'axios';
import Button from '../../components/Button/Button.jsx';
import './Forgot.css';
import { useNavigate } from 'react-router-dom'; 

const Forgot = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const navigate = useNavigate();

    const handleRequestPasswordReset = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/forgot-password', { email });
            setMessage(response.data.message);
            setShowNotification(true);

            if (response.data.route) {
                setTimeout(() => {
                    setShowNotification(false);
                    navigate(response.data.route, { state: { email } });
                }, 2000);
            }
        } catch (error) {
            setMessage(error.response.data.message || 'An error occurred');
            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false);
            }, 2000);
        }
    };

    return (
        <div className='Contain_Forgot'>
            <form onSubmit={handleRequestPasswordReset}>
                {showNotification && (
                    <div className="notification">
                        {message}
                    </div>
                )}
                <div className="white-box"></div>
                <h1>Forgot your password?</h1>
                <h2>Please enter the email address where you want to reset your password.</h2>
                <h3>Enter Email Address</h3>
                
                <div className="input-boxmail">
                    <input 
                        type="email" 
                        placeholder='' 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>
                <div className="Request">
                        <Button type="submit" label="Request password reset" />
                </div>
                <div className="Back">
                    <a href="Login">Back to sign In</a>
                </div>
            </form>
        </div>
    );
};

export default Forgot;
