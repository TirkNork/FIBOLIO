import React, { useState } from "react";
import { Link } from "react-router-dom";

function Course() {
  const [selectedOption, setSelectedOption] = useState(""); // State to store the selected option

  // Function to handle change in the dropdown selection
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value); // Update the selected option
  };

  return (
    <div>
      <h1>Course</h1>
      <p>Course page</p>
      <div>
        <select value={selectedOption} onChange={handleSelectChange}>
          <option value="">Select an option</option>
          <option value="page1">Page 1</option>
          <option value="page2">Page 2</option>
          <option value="page3">Page 3</option>
        </select>
        {/* Render link based on the selected option */}
        {selectedOption && (
          <Link to={`/${selectedOption}`}>Go to {selectedOption}</Link>
        )}
      </div>
    </div>
  );
}

export default Course;
