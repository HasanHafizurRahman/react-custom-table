import { useState } from 'react';
import './App.css'
import Table from './components/Table'
import Pagination from './components/Pagination';
import SearchBar from './components/SearchBar';

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (direction) => {
    setCurrentPage((prev) => prev + direction);
  };

  return (
    <div className="app">
      <h1>Custom Table</h1>
      <SearchBar searchQuery={searchQuery} onSearch={handleSearch} />
      <Table currentPage={currentPage} searchQuery={searchQuery} />
      <Pagination
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  )
}

export default App
