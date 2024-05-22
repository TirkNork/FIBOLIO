import React, { useState } from 'react';
import axios from 'axios';
import './Forgot.css';

const Forgot = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [showNotification, setShowNotification] = useState(false);

    const handleRequestPasswordReset = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/forgot-password', { email });
            setMessage(response.data.message);
            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false);
                window.location.href = '/Verification'; 
            }, 3000);
        } catch (error) {
            setMessage(error.response.data.message);
            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false);
            }, 3000);
        }
    };

    return (
        <div className='Contain'>
            <form onSubmit={handleRequestPasswordReset}>
                {showNotification && (
                    <div className="notification">
                        {message}
                    </div>
                )}
                <div className="white-box"></div>
                <h1>Forgot your password?</h1>

                <div className="Please1">
                    <p>Please enter the email address you’d like your password reset information sent to</p>
                </div>

                <div className="Email">
                    <p>Enter Email Address</p>
                </div>

                <div className="input-boxmail">
                    <input 
                        type="email" 
                        placeholder='' 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>

                <div className="Request">
                    <button type="submit">Request password reset</button>
                </div>

                <div className="Back">
                    <a href="Login">Back to sign In</a>
                </div>
            </form>
        </div>
    );
};

export default Forgot;
