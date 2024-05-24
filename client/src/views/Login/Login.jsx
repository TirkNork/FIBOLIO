import React, { useState, useEffect } from 'react';
import { FaUser, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button.jsx';
import axios from 'axios';
import './Login.css';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedEmail = localStorage.getItem('email');
        const storedPassword = localStorage.getItem('password');
        const storedRememberMe = localStorage.getItem('rememberMe') === 'true';
        if (storedRememberMe && storedEmail && storedPassword) {
            setEmail(storedEmail);
            setPassword(storedPassword);
            setRememberMe(storedRememberMe);
        }
    }, []);
    
    useEffect(() => {
        if (rememberMe) {
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);
            localStorage.setItem('rememberMe', rememberMe);
        } else {
            localStorage.removeItem('email');
            localStorage.removeItem('password');
            localStorage.removeItem('rememberMe');
        }
    }, [rememberMe, email, password]);
    
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSwitch = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post('http://localhost:3001/login', { email, password });
            setMessage(res.data.message);
            if (res.data.message === "Login Successfully") {
                if (res.data.role === "Teacher") {
                    navigate('/TeacherPage', { state: { teacherID: res.data.teacherID } });
                } else {
                    navigate('/Home', { state: { studentID: res.data.studentID } });
                }
            }
        } catch (err) {
            console.error(err);
            setMessage('Login failed. Please try again.');
        }
    };

    const handleSignUp = () => {
        navigate('/Register'); 
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent the default form submission
            handleSwitch(event); // Manually trigger the login function
        }
    };

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(''), 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <div className='wrapper'>
            <form onSubmit={handleSwitch} onKeyDown={handleKeyDown}>
                <h1>Sign In</h1>
                <div className="Welcome">
                    <p>Welcome</p>
                </div>
                <div className="Back">
                    <p>Back</p>
                </div>
                <div className="FIBOLIO">
                    <p>TO FIBOLIO</p>
                </div>
                <div className="WelcomeText">
                    <p>Let's get to know yourselves better together.</p>
                </div>
                <div className="Account">
                    <p>Don't have an account?</p>
                </div>
                <div className="SignUp">
                    <Button type="button" onClick={handleSignUp} label="SIGN UP" />
                </div>
                <div className="Email">
                    <p>Email Address</p>
                </div>
                <div className="input-boxname">
                    <input 
                        type="email"
                        placeholder='Enter your Email Address'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <FaUser className='Icon' />
                </div>
                <div className="Password">
                    <p>Password</p>
                </div>
                <div className="input-boxpass">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Enter your Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label onClick={togglePasswordVisibility}>
                        {showPassword ? <FaRegEye className="Icon" /> : <FaRegEyeSlash className="Icon" />}
                    </label>
                </div>
                <div className="remember">
                    <input 
                        type="checkbox" 
                        className="custom-checkbox" 
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)} 
                    />
                </div>
                <div className="rememberMe">
                    <p>Remember Me</p>
                </div>
                <div className="SignIn">
                    <Button type="submit" label="SIGN IN" />
                </div>
                <div className="forgot">
                    <a href="Forgot">Forgot your password?</a>
                </div>
                <div className="policy">
                    <p>By clicking on "Sign In" you agree to</p>
                </div>
                <div className="accept">
                    <a href="#">Terms of Service and Privacy Policy.</a>
                </div>
                {message && (
                    <div className="popup">
                        <p>{message}</p>
                    </div>
                )}
            </form>
        </div>
    );
};

export default Login;
