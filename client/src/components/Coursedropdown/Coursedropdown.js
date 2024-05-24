import React from "react";
import "./Coursedropdown.css";

function Dropdown({ handleSortToggle, sortType, sortOrder }) {
    return (
        <div className="dropdown-container">
            <label className="dropdown-label"></label>
            <select className="dropdown-menu" onChange={(e) => handleSortToggle(e.target.value)}>
                <option value="">Sort By</option>
                <option value="year-asc">
                    Academic Year (Ascending) {sortType === 'year' && sortOrder === 'asc' && '↑'}
                </option>
                <option value="year-desc">
                    Academic Year (Descending) {sortType === 'year' && sortOrder === 'desc' && '↓'}
                </option>
                <option value="grade-asc">
                    Grade (Ascending) {sortType === 'grade' && sortOrder === 'asc' && '↑'}
                </option>
                <option value="grade-desc">
                    Grade (Descending) {sortType === 'grade' && sortOrder === 'desc' && '↓'}
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
