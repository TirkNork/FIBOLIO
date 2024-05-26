import React from "react";
import "./Searchbar.css";

function Searchbar({ searchTerm, handleSearch }) {
    return (
        <input
            className='search'
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder='Search by course name'
        />
    );
}
export default Searchbar;