/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";

const Pagination = ({ currentPage, onPageChange, rowsPerPage, setRowsPerPage }) => {
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchTotalPages = async () => {
      try {
        const response = await axios.get(
          `https://api.razzakfashion.com/?paginate=${rowsPerPage}`
        );
        setTotalPages(response.data.last_page);
      } catch (error) {
        console.error("Error fetching total pages:", error);
      }
    };
    fetchTotalPages();
  }, [rowsPerPage]);

  return (
    <div className="pagination">
        <span>Rows per page </span>
      <div className="rows-per-page">
        <span>{rowsPerPage}</span>
        <button onClick={() => setRowsPerPage((prev) => Math.max(prev - 1, 1))}>↓</button>
        <button onClick={() => setRowsPerPage((prev) => prev + 1)}>↑</button>
      </div>

      <button
        onClick={() => onPageChange(1 - currentPage)}
        disabled={currentPage === 1}
      >
        |&lt;
      </button>
      <button
        onClick={() => onPageChange(-1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
      <button
        onClick={() => onPageChange(totalPages - currentPage)}
        disabled={currentPage === totalPages}
      >
        &gt;|
      </button>
    </div>
  );
};

export default Pagination;
