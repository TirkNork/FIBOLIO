import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Changepass.css';
import { FaUser, FaEye, FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Changepass = () => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/login');
    };

    return (
        <div className='Contain1'>
            <form action="">
                
                <div className="white-box">
                </div>
                <h1>Change password</h1>

                <div className="Create">
                    <p>Create New Password</p>
                </div>
                

                <div className="input-boxpassnew">
                    <input type="password" placeholder=' ' />
                </div>

                <div className="Confirm">
                    <p>Confirm New Password</p>
                </div>

                <div className="input-boxpassconfirm">
                    <input type="password" placeholder=' ' />
                </div>

                <div className="Save">
                    <button type="submit">Save Change & Continue</button>
                </div>

                <div className="Back">
                    <button type="button" onClick={handleBackClick}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default Changepass;
