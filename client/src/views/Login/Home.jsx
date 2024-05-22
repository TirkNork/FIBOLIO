import React from 'react';

const Home = ({ location }) => {
    // ตรวจสอบว่า location มีค่าหรือไม่ก่อนที่จะเข้าถึง 'state'
    if (!location) {
        return <div>Loading...</div>; // หรือให้ทำการจัดการแสดงผลที่เหมาะสม
    }

    // เข้าถึงคุณสมบัติ 'state' ของ 'location'
    const { state } = location;

    return (
        <div>
            <h1>Welcome to Home</h1>
            <p>Your student ID is: {state.studentID}</p>
        </div>
    );
};

export default Home;
