import React, { useState } from 'react';

function DataTable({ data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState({});
  const [selectedColumns, setSelectedColumns] = useState({});

  const handlePageChange = (direction) => {
    setCurrentPage((prevPage) =>
      direction === 'next' ? prevPage + 1 : prevPage - 1
    );
  };

  const handleRowSelection = (index) => {
    setSelectedRows((prevSelected) => ({
      ...prevSelected,
      [index]: !prevSelected[index],
    }));
  };

  const handleColumnSelection = (index) => {
    setSelectedColumns((prevSelected) => ({
      ...prevSelected,
      [index]: !prevSelected[index],
    }));
  };

  const displayData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2">Select Row</th>
            {data[0].map((header, index) => (
              <th
                key={index}
                className={`px-4 py-2 ${selectedColumns[index] ? 'bg-blue-100' : ''}`}
                onClick={() => handleColumnSelection(index)}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {displayData.map((row, rowIndex) => (
            <tr key={rowIndex} className={`${selectedRows[rowIndex] ? 'bg-gray-100' : ''}`}>
              <td className="px-4 py-2">
                <input
                  type="checkbox"
                  checked={selectedRows[rowIndex] || false}
                  onChange={() => handleRowSelection(rowIndex)}
                />
              </td>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-4 py-2 border-t border-gray-200">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center py-2">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange('prev')}
          className="bg-blue-500 text-white px-3 py-1 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <p>Page {currentPage}</p>
        <button
          disabled={currentPage * rowsPerPage >= data.length}
          onClick={() => handlePageChange('next')}
          className="bg-blue-500 text-white px-3 py-1 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default DataTable;
