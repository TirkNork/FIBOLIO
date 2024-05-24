import React, { useState } from "react";
import './Search.css';
function Search({ searchTerm, handleSearch }) {
  return (
    <input className='search' type="text" name="search" value={searchTerm}
    onChange={handleSearch} placeholder='Search ' />
  );
}
export default Search;