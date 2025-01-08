import { useState } from 'react';
import './App.css'
import Table from './components/Table'

function App() {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (direction) => {
    setCurrentPage((prev) => prev + direction);
  };

  return (
    <div className="app">
      <h1>Custom Table</h1>
      <Table currentPage={currentPage} />
    </div>
  )
}

export default App
