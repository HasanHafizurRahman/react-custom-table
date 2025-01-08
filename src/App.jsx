import { useState, useCallback } from "react";
import "./App.css";
import Table from "./components/Table";
import SearchBar from "./components/SearchBar";
import Pagination from "./components/Pagination";

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((offset) => {
    setCurrentPage((prev) => prev + offset);
  }, []);

  return (
    <div className="app">
      <h1>Custom Table</h1>
      <SearchBar searchQuery={searchQuery} onSearch={handleSearch} />
      <Table currentPage={currentPage} rowsPerPage={rowsPerPage} searchQuery={searchQuery} />
      <Pagination
        currentPage={currentPage}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
      />
    </div>
  );
};

export default App;
