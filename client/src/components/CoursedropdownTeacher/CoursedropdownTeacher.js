import React from "react";
import "./CoursedropdownTeacher.css";

function Dropdown({ handleSortToggle, sortType, sortOrder }) {
    return (
        <div className="dropdown-container">
            <label className="dropdown-label">Sort by:</label>
            <select className="dropdown-menu" onChange={(e) => handleSortToggle(e.target.value)}>
                <option value="">Select</option>
                <option value="year-asc">
                    Academic Year (Ascending) {sortType === 'year' && sortOrder === 'asc' && '↑'}
                </option>
                <option value="year-desc">
                    Academic Year (Descending) {sortType === 'year' && sortOrder === 'desc' && '↓'}
                </option>
                <option value="classType-asc">
                    Class Type (Ascending) {sortType === 'classType' && sortOrder === 'asc' && '↑'}
                </option>
                <option value="classType-desc">
                    Class Type (Descending) {sortType === 'classType' && sortOrder === 'desc' && '↓'}
                </option>
            </select>
        </div>
    );
}

export default Dropdown;
