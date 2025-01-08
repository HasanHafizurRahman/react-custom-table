/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { useState, useEffect } from "react";

const SearchBar = React.memo(({ searchQuery, onSearch }) => {
  const [localQuery, setLocalQuery] = useState(searchQuery);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      onSearch(localQuery); 
    }, 300); 

    return () => clearTimeout(delayDebounce); 
  }, [localQuery, onSearch]);

  return (
    <input
      type="text"
      placeholder="Search by name..."
      value={localQuery}
      onChange={(e) => setLocalQuery(e.target.value)}
      className="search-input"
    />
  );
});

export default SearchBar;

