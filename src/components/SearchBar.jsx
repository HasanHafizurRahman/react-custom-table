/* eslint-disable react/prop-types */

const SearchBar = ({ searchQuery, onSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search by name..."
      value={searchQuery}
      onChange={(e) => onSearch(e.target.value)}
      className="search-input"
    />
  );
};

export default SearchBar;
