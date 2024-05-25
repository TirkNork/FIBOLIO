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
        <div className='wrapper_Login'>
            <form onSubmit={handleSwitch} onKeyDown={handleKeyDown}>
                <div className="Logo">
                    <img className="kmuttLogo" alt="logo1" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAvVBMVEXvSyb39fbwRyDoeF339/j39fXvRBr3/Pv5+vrrjnvxp5XvQRXvSyf99/P5/P310cXcPxLoPw/5597oX0P52dDtdlzrPQbvlYDpfmXoUSjrloHps6fwuqv8+vjvQBLusqHmZ0noUzD0y7/jXTrujHX339TwwrT88+zlcFPlQhTwvazrn4rkZ0nqhWzcPxPuqpvvPADmUizmWjf228/zzsfhmYLlq5XeVCfrLgD77eP/+/LsUy7tfGX10sPtmYlnrw2dAAAN6ElEQVR4nO2dC3eiuhbHISYxFaGDtlQ9glZr0VrraOfeO55zZr7/x7p58kZL67TBxX+ddSaFgPkZyN7ZeWi0gHHhagjrr4aw/moI66+GsP5qCOuvhrD+agjrr4aw/moI66+GsP5qCOuvhrD+0pcQBMFZyqYtodeaTJbeGW6kKSFwn9oOaU/cj99KU0J85UDTRGTw8eJpSujNKKCJ4Dj48K10JfzFCcnjxRJaW4cROmv84VtpSgiGvTaEZLH6+K00JTTA/bjXmwzPUDpdCQ3D9TzrHIXTl/Bc0pcQYHzZXlswXa/7H7cV+hK6E7/t+Gvr43fSlBBvmNcG22conqaEwYxbfPJ0sT6Nd828NhNesNc2YXVoOmd4ETUlBPsDgcjpDT9+K00JDTCfHQ6P95fstYHgZXWWQI22hN1z3UgHwoR/lk7yf7tlGd4oDQiD+cPDTtBYNHkvk/tUci8aVbwTyQo1/PWEbscnJHxgMO7aJu3wisFYNEnsEU+ObOLbo0Amib2uZCS/nBBvCPPP/CkwwEAklyzpQySTtz4/2sIGWPqosi/35YSu8F7IJDC8GeHJsWUEjxSQIlKvzXriQan2o2sET/Qoi095FZ7TLyf0FqzU1D/zDPdGuGozy/BYEprwh8e/AkixZq7x/YfIcFMlFv7lhO6jqMMOrbgn4ap1cNcai1jbhB6dZJKmM67iy305IZjarIYOQ/rG9W0CITzsaHJvExPC8J45cCFP7unRe5o0efLt+nJCAy9f7fCaFxo/39j29VwkX23715S1sHh6bds3UyCSoX3zzI7W5z1kozD3Oxeo5H022S08+nZpQFiks/ls2hIyAVBUtuKjR6QtIR62bo3cqAXu3raGuFIN60poPYSOcxhkEPHm4DjhQ6WOv6aE1D9jJt+epooHpr5y694uTQm512YiOEk52cHYQahqfEpTQu+X9EBTLPX02ooVjIV/Nkm9csprqxRF1ZSQ+XIo55+BuV3wdp6QpoQGbvV8v7fMtqVLdrRVaehbV0IDu8/TnH/WBe702a3klupLyLyX3KFudPTSCEWyK5KgMEMph7aEeDXtrwCn4knx7oFVf7oSTyl2ZZIdnatkXroSWgPapix4SyMaHda8dPFyQZPcl+NJ4dbhZ3Z0U+LLaUoIniNrQXv+ykRIa8HjcvNQOHAUcRcSFpe7LUbRlFCGbAgLzoyJCM64KmTDxk3xts0zUKfH6jjIRAjOvMLmR1NCFmuTHqgaLE3H2oKZTFLuR8KjdYtiX05TQul5syiqy+sQsQBbMBYzFlnFTRyGRWaBnANnsnBjUSVqSiij23afvnHPosv0DERcjiWxejv9Fo/LsbmofrYzKaUpYbIHbPFuL28qrUHUA8aDHk3yMQ7cYkdHJfOJdSU08PD2Vto4vKJJhtLlyRd59Nvt7dCKMgzLOv7aEqadlyLvBeScnkLpS5iTbEaqFrhGhEzAHQ69dJFP+eAfIawU1DtLjBdPb4j/utQxqt+N/icTbylgt5u4mAnch9RMknD+GX18YGGhY9cDHIv+idU1Fn5LLz1zNVWw/bzRNTAdSW3Kb2C1VKbR7wdqmTfRn6OH04jxR1CJQ58Za8NXbUeo/NO8O98hIlO7R50T90b96Tj+6QfNu3Ei+S/8EHXCC2KMJ/R+QpMLXpcQAq9DoMxDZi8gGrFnniXvNBwXddbMSPY3cUxEwtst3P3jUYyThMAbx4BPPE9MSJ3n8OXEB3tPJEdoWHd8Dkql9V5/iBCsrlUBIel4vDlMENKewOhEJQ5DmCekvlw0u+it+jOEePcaAfp3MkfyKeW9uWNPmrVumwWE9NafNOvrOKE17/EOLGsV7IFqFlJ1aPrHP9ntwWLCyvoThMEyhEi2KIfn6GlME5LZsSYfDHi/PUcI3JeXzxnHP0bobWyJgkhvH780aULkH5sz4qXyRoRgPwvDWSWX5g8QemtfVqBJXpNLszKEZFtu1WgPHhUR7noEQcJm2bxdZyf0JkS9g+3ZKnn3NKFJDUbp7YMJMQsIZUTGOWlMkzozIXAf2+rbb4/T/ZwMITUYZc0+eAnTWSWh8trKvIxCnZcQDJUZRNDfZsqRJYSLMsuNR+kqVITBk/DajjZSWZ2VEN8vVBMI/VG2GFlCk5QNBHoLHjXMEeIW95Pamyo2/5yE1vOBNgQmC+1Be5P7nnOEsKQuQKudzhi1NO7ap25456u8tmAgzSBrRZb5xiAmVP+W9DDcGUnni+2hNR+NptVWCp2P0LuyI0em1y94jiJCpPyV4h4G2Nvqe0IoQ/h5c/XzhNQMqhp0boZFL0pE6P/HVwhFPYxgK6oQkf+G2Tp8awAkoXMRstEFAYicX6vih08Rkta1/DIKexgrWcXI/p8yGorwPeGsDxPyPj5Y8fWCogafShzHBOFGGs0ig4Ef5K3JeGXn6rC6zlKHYHgTdZacrBmMFBMOPPUm+nmD4d2oc1NDF0I8j7o60F9/L7smQfh9Las8bzDEqBN7C6+9oSaE1pLNLxePXYEZjJQgxKIHjwoMhifGO6lXu8GaEP6MOkss/DIvdzeShCxqhkw5Bhqra4CdLdhhzwWaEF75sauCYK88wpQkBHNxFUJhenMPqyOf3/ZvbGhBaNp+yhfjXnFxo54klFvsUDnpHoaKXsBwaOhBiJIOMvuLvKUtxdT3dMSVaYOBN6KdoX3AQBNChUbiTkXZ1J0UoeEupF0nySJE0QveAmlECMlkHSGGRU6pkSW0VB8waTDA1E887BoRss4gW1onHZXeKa+NT0BYRS5ZbDDEdBJTdR21IYThIKCOW0953iV98AyhtZWGL2EwVtLwyJdTD0Jkkh43gmKyC1ex55Ym7IppMPwL+iabXywedYScO/4u60FoOtfCBHatK9+Uvk1ha5OpQ+q9JAwGJ3QXMpJ8EEZSC0LkT6KuhDdWHQxYNBCdJaQeqHgIlMHALdlaQRlK1YIQvv6MDbx7E0XaClqbLKHqRSDVwxBeAK1Gfwf4PfUgTMbawO4gjZxYjZxWjhBviKxE3jSBuQSKrtWPkD5n0iWhLWSnNJqoCGMXjRuMQEw3pFWo1jVpSGh4quPH5gpmWps8oaVyM4MBViLwhOKJCDoSsjX1oiLyrU2eEAzVMFy4AvhO4UYTNbQkZIbf5GvpUXuRbm3yhLT1lYRkZHmv8pHtRf0pLQn5HHRZLifd2hQQgr7wQxFceEvVq4h3TtKT0Aiuomki7VRrU0CoDAQ9tuTznunjHcY7J2lKSB+9yN9JzUwuIqTdRMEFX4Ujjkhi21ldCQ03noiRXF5XQNiljpryv9WXklh6py2hmEIoTif2WC2qQwOP5JtoFtxPU8IuN/yyaEnfppCQdhNTI/apc5oSMnkd9dAhP2ptigmtbXK8Nx210ZhQbaZjJn2bYsKomyiqPDVUozMhUANIPEosPqOYMO4msruFKSdBZ0KxVFkNMInWpoRQDVTwM+khU60JE4Zf7etUQih3J+c3y8yT0pvQ8CbRkGJ7zRDLCPHGSX4VCelNSOvsVU2hhf5VkHpKM50O8c5CmJ2vOFSxKrt8+tRJvZvQ922b/ferdDgN7A8sE5Xv/70BlJD+yS7xk4Rd1k30Ra7XzL12oTzx9+fXofFPX2pfProOdv1Y9HP2Kv1PNueJ4/3++wrJ9e4VJUDqLXlkNlByTdcou1fZFVX0/hUlUieut86j9xWS690rSjpSR1aUUOHOefSuQgq9vy0lXM5fR79fzyfnkP8VbakKG/11dJaZpyzax/SV9vAkITpe9oaQCUGtCVUX4yhCQSp1vg6EMNt4RMXPHI+6UskrvqSlqUYIe3dprdUofniVOn4VzT3dJg+/q5BCn0bopSx4sFcT29gJHJ/4Gc3bu01c8ZHfRPo0wvTUJ9CPCNPzL+OZiSWbsVRWQ1iihlCpIbwcQvPiCS+/DhvC+IK6EjbvYXxBQ1hZDWGJGkKlhvByCBtrEV/QEFZWQ1iihlDp8glXKoidAakDoRp7Ov47BUOEaluHivD4ZkhzvxhEf0Lwryp6yQ7MMtsgylY7wqUq+mF1JFu8yDCz+WANCNX6FpPt0VwqaywJs7Od9Cc0Vge5kYlzbPM8t6eWJGa2vaoBYVQSeF26iYIBpmo4kGS2BaoBIdssVdSPX/6rL95YLt1CdmZzthoQgqUaxS1YpabyzKVHg9j29+lT+hNG686QSbJLuJSipeco9wvidSAM1PYObHl6IeL3aFs5aGd/QbwOhGxRhawhGLa83G2AO44ms6e39+Bna0CYqEQT+pOhl9yhCgReaxEBInuX/ZRaEBqrhVoZw3ZrfBoMXS8ILCsIvNV89ErURHb6Fv7OPcX1IMT8l8NUNRJiL36MJ9vt5PHm4BMYLzEocs7rQWhYD8mtaZAJ5SQfWntIbHoifh1lmP+MmhAanth958iMLmpLFrmX0KgPId9IsByPyZkVbgNSE0K2Sm3/qw1L6xBBe128eVtNCJmA+9BzYGFFQsd/3Je4OzUiZD/jt7m2Hdp4ovidRAg65DCZ5x0BKUqISgn5GaIPIWX09nePPdtnvwsA+Ub/fvg6+XcVlN8b9NuQyzlkCR1xoq0TIdtzM3D3rYf1dkstYuf34HnonVimsH8aC02S+boG7sjjT32tCLkAm0QZuGyy5BtuSn0fLvErR0oUUR6uuC95uc5ImFT291MqXndO/SFCjdQQ1l8NYf3VENZfDWH91RDWXw1h/dUQ1l8NYf3VENZfDWH91RDWXw1h/XXxhP8HubZIoi8OJJIAAAAASUVORK5CYII="></img>
                    <img className="FIBOlogo" alt="logo2" src="https://upload.wikimedia.org/wikipedia/th/thumb/6/6f/FIBO.svg/640px-FIBO.svg.png" ></img>
                </div>
                <h1>Sign In</h1>
                <h2>Welcome</h2>
                <h3>Back</h3>
                <h4>TO FIBOLIO</h4>
                <h5>Let's get to know yourselves better together.</h5>
                <h6>Don't have an account?</h6>
                <div className="SignUp">
                    <Button type="button" onClick={handleSignUp} label="SIGN UP" />
                </div>
                <h7>Email Address</h7>
                <div className="input-boxname">
                    <input 
                        type="email"
                        placeholder='Enter your Email Address'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <FaUser className='Icon' />
                </div>
                <h8>Password</h8>
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
                <h9>Remember Me</h9>

                <div className="SignIn">
                    <Button type="submit" label="SIGN IN" />
                </div>

                <div className="forgot">
                    <a href="Forgot">Forgot your password?</a>
                </div>
                
                <h10>By clicking on "Sign In" you agree to</h10>
                
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
