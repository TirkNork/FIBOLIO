import React from 'react';
import { useLocation } from 'react-router-dom';

const Home = () => {
    const location = useLocation();
        const { state } = location || {};
    const { studentID } = state || {};

    return (
        <div>
            <h1>Welcome to FIBOLIO</h1>
            <p>Your student ID is: {studentID || 'Not available'}</p>
        </div>
    );
};

export default Home;