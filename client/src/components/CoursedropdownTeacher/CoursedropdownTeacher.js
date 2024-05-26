import React from "react";
import "./CoursedropdownTeacher.css";

function Dropdown({ handleSortToggle, sortType, sortOrder }) {
    return (
        <div>
            <select className="sortby" onChange={(e) => handleSortToggle(e.target.value)}>
                <option value="">Sort By</option>
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
