import React, {useState} from "react";
import { Link } from "react-router-dom";
import "./Register01.css";
import StudentForm from "../../components/studentForm/studentForm";
import RoleDropdown from "../../components/dropdown/dropdown";
import TermsNconscheckBox from "../../components/termsNcon/termsNcon";
import Button from "../../components/buttons/buttons";


const Register = () => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);
    };

    return (
        <div>
            <h1>Create Account</h1>
            <p>Already have an account? <Link to="/Test1">Login Here</Link></p>
            <RoleDropdown value={selectedOption} onChange={handleSelectChange}/>
            {/* <p>Selected option: {selectedOption}</p> */}
            {/* Conditionally render Component1 or Component2 based on selectedOption */}
            {selectedOption === 'Student' && <StudentForm />}
            {selectedOption === 'Instructor' && <p>Selected option: {selectedOption}</p>}
            {/* <StudentForm /> */}
            <TermsNconscheckBox />
            <Button value="Sign Up"/>
        </div>
    );
}

export default Register;