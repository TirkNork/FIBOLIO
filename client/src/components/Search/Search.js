import React, { useState } from "react";

function Search({ searchTerm, handleSearch }) {
  return (
    <input className='search' type="text" name="search" value={searchTerm}
    onChange={handleSearch} placeholder='Search ' />
  );
}

export default Search;