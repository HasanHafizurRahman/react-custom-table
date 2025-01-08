/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

const Table = React.memo(({ currentPage, rowsPerPage, searchQuery }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.razzakfashion.com/?paginate=${rowsPerPage}&search=${searchQuery}`,
        { params: { page } }
      );
      // console.log("data", response?.data?.data);
      setData(response?.data?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [rowsPerPage, searchQuery]);

  const prefetchNextPage = useCallback(async () => {
    if (currentPage < 10) {
      try {
        await axios.get(
          `https://api.razzakfashion.com/?paginate=${rowsPerPage}&search=${searchQuery}`,
          { params: { page: currentPage + 1 } }
        );
      } catch (error) {
        console.error("Error prefetching next page:", error);
      }
    }
  }, [currentPage, rowsPerPage, searchQuery]);

  useEffect(() => {
    fetchData(currentPage);
    prefetchNextPage();
  }, [currentPage, fetchData, prefetchNextPage]);

  if (loading) return <p>Loading...</p>;
  if (data.length === 0) return <p>No results found.</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Created At</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{new Date(item.created_at).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});

export default Table;
