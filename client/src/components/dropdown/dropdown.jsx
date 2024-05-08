import React, { useState } from 'react';
import "./dropdown.css"

const RoleDropdown = ({value, onChange}) => {
//   const [selectedOption, setSelectedOption] = useState('');

//   const handleSelectChange = (e) => {
//     setSelectedOption(e.target.value);
//   };

  return (
    <div>
      <label>Who are you?</label>
      <select value={value} onChange={onChange}>
        <option value="" disabled selected>
          Select your account Role.
        </option>
        <option value="Student">Student</option>
        <option value="Instructor">Instructor</option>
      </select>
      {/* <p>Selected option: {selectedOption}</p> */}
    </div>
  );
};

export default RoleDropdown;
