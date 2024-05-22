import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // เพิ่มนี้
import './Verification.css';

const Verification = () => {
    const [inputValue, setInputValue] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    const handleChange = (index, value) => {
        const newInputValue = [...inputValue];
        newInputValue[index] = value;
        setInputValue(newInputValue);

        if (index < 5 && value !== '') {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleClose = () => {
        navigate('/login');
    };

    const handleVerifyAndContinue = async (e) => {
        e.preventDefault();

        try {
            const otp = inputValue.join('');
            const response = await axios.post('http://localhost:3001/verify-otp', { otp });
            alert(response.data.message);

            if (response.data.success) {
                navigate('/change-password');
            }
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    const handleResendCode = async () => {
        try {
            const response = await axios.post('http://localhost:3001/resend-otp');
            alert(response.data.message);
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <div className='Contain2'>
            <form onSubmit={handleVerifyAndContinue}>
                <div className="white-box"></div>
                <span className="close-icon" onClick={handleClose}>&times;</span>
                <h1>OTP Verification</h1>
                <div className="Please">
                    <p>Please enter OTP Code sent to your Email.</p>
                </div>

                {[...Array(6)].map((_, index) => (
                    <div key={index} className={`input-box${index + 1}`}>
                        <input
                            ref={el => inputRefs.current[index] = el}
                            type="text"
                            maxLength="1"
                            value={inputValue[index]}
                            onChange={e => handleChange(index, e.target.value)}
                        />
                    </div>
                ))}
                <div className="Did">
                    <p>Didn’t receive OTP code?</p>
                </div>

                <div className="Resend">
                    <p><a href="#" onClick={handleResendCode}>Resend Code</a></p>
                </div>

                <div className="Requeast">
                    <button type="submit">Verify & Continue</button>
                </div>
            </form>
        </div>
    );
};

export default Verification;
