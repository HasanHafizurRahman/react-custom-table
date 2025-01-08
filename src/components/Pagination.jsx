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
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
      <button
        onClick={() => onPageChange(totalPages - currentPage)}
        disabled={currentPage === totalPages}
      >
        &gt;|
      </button>
      <div className="rows-per-page">
        <button onClick={() => setRowsPerPage((prev) => Math.max(prev - 1, 1))}>-</button>
        <span>{rowsPerPage} Rows per page</span>
        <button onClick={() => setRowsPerPage((prev) => prev + 1)}>+</button>
      </div>
    </div>
  );
};

export default Pagination;
