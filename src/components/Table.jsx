/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

const Table = React.memo(({ currentPage, rowsPerPage, searchQuery }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState({});

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

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, fetchData]);

  const handleCheckboxChange = (id) => {
    setSelectedRows((prev) => ({
      ...prev,
      [id]: !prev[id], 
    }));
  };

  if (loading) return <p>Loading...</p>;
  if (data.length === 0) return <p>No results found.</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              onChange={(e) => {
                const checked = e.target.checked;
                setSelectedRows(
                  checked
                    ? Object.fromEntries(data.map((item) => [item.id, true]))
                    : {}
                );
              }}
              checked={
                data.every((item) => selectedRows[item.id]) && data.length > 0
              }
            />
          </th>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Created At</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>
              <input
                type="checkbox"
                checked={!!selectedRows[item.id]}
                onChange={() => handleCheckboxChange(item.id)}
              />
            </td>
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
