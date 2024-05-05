import React, { useState } from 'react';

const RoleDropdown = ({value, onChange}) => {
//   const [selectedOption, setSelectedOption] = useState('');

//   const handleSelectChange = (e) => {
//     setSelectedOption(e.target.value);
//   };

  return (
    <div>
      <h4>Who are you?</h4>
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
