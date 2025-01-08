import React, { useState, useEffect } from "react";
import axios from "axios";

const Pagination = ({ currentPage, onPageChange }) => {
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchTotalPages = async () => {
      try {
        const response = await axios.get("https://api.razzakfashion.com/");
        setTotalPages(response.data.last_page);
      } catch (error) {
        console.error("Error fetching total pages:", error);
      }
    };
    fetchTotalPages();
  }, []);

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(-1)}
        disabled={currentPage === 1}
      >
        ←
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === totalPages}
      >
        →
      </button>
    </div>
  );
};

export default Pagination;
