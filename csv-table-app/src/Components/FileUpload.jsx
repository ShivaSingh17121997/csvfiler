import React, { useState } from 'react';
import Papa from 'papaparse';

function FileUpload({ setData }) {
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'text/csv') {
      setError('Only CSV files are allowed');
      return;
    }

    Papa.parse(file, {
      complete: (result) => {
        if (result.data.length === 0) {
          setError('The CSV file is empty.');
          return;
        }
        setData(result.data);
      },
      header: false,
      skipEmptyLines: true,
    });
  };

  return (
    <div className="my-4">
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500
                   file:mr-4 file:py-2 file:px-4
                   file:rounded-full file:border-0
                   file:text-sm file:font-semibold
                   file:bg-blue-50 file:text-blue-700
                   hover:file:bg-blue-100"
      />
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}

export default FileUpload;
