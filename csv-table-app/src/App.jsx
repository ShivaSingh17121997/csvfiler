import { useState } from 'react'

import './App.css'
import FileUpload from './Components/FileUpload'
import DataTable from './Components/DataTable'

function App() {
  const [data, setData] = useState([]);

  return (
    <>
      <div className="container mx-auto p-4">
        <h1  className="text-2xl font-bold mb-4 bg-slate-500 py-3 ">CSV Table Viewer</h1>
        <FileUpload setData={setData} />
        {data.length > 0 && <DataTable data={data} />}
      </div>
    </>
  )
}

export default App
