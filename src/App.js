import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://hodlinfo-backend-ugp7.onrender.com/get-data');
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const lightThemeClass = {
    backgroundColor: '#ffffff',
    color: '#000000',
  };

  const darkThemeClass = {
    backgroundColor: '#000000',
    color: '#ffffff',
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div style={theme === 'light' ? lightThemeClass : darkThemeClass}>
      <div className="d-flex justify-content-between">
        <h1 className="text-center">HODLINFO</h1>
        <button className="btn btn-primary" onClick={toggleTheme}>
          Toggle Theme
        </button>
      </div>
      <table
        className={`table ${theme === 'light' ? 'table-light' : 'table-dark'} table-hover`}
      >
        <thead>
          <tr>
            <th className="text-danger">#</th>
            <th className="text-danger">Name</th>
            <th className="text-danger">Last Price</th>
            <th className="text-danger">Buy Price</th>
            <th className="text-danger">Sell Price</th>
            <th className="text-danger">Volume</th>
            <th className="text-danger">Base Unit</th>
          </tr>
        </thead>
        <tbody>
          {data.map((crypto, index) => (
            <tr key={crypto.id}>
              <td>{index}</td>
              <td>{crypto.name}</td>
              <td>₹ {crypto.last}</td>
              <td>₹ {crypto.buy}</td>
              <td>₹ {crypto.sell}</td>
              <td>{crypto.volume}</td>
              <td>{crypto.base_unit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;