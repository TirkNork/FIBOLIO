import React from 'react';
import "./dropdown.css"

const RoleDropdown = ({ value, onChange }) => {
//   const [selectedOption, setSelectedOption] = useState('');

  // const handleSelectChange = (e) => {
  //   onChange(e.target.value);
  // };

  return (
    <div>
      <label>Who are you?</label>
      <select id="roleSelect" value={value} onChange={onChange}>
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


// import React, { useState } from 'react';

// const RoleDropdown = ({ value, onChange }) => {
//   const handleChange = (e) => {
//     onChange(e.target.value);
//   };

//   return (
//     <div>
//       <label htmlFor="roleSelect">Who are you?</label>
//       <select id="roleSelect" value={value} onChange={handleChange}>
//         <option value="" disabled selected>Select your account Role.</option>
//         <option value="Student">Student</option>
//         <option value="Instructor">Instructor</option>
//       </select>
//     </div>
//   );
// };

// export default RoleDropdown;