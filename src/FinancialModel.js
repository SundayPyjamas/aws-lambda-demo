import React, { useState } from 'react';

const FinancialModel = () => {
  const [revenue, setRevenue] = useState('');
  const [costs, setCosts] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);

    try {
      const response = await fetch('YOUR_API_GATEWAT_URL', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ revenue: parseFloat(revenue), costs: parseFloat(costs) }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Fetch error:', error);
      if (error.message.includes('CORS')) {
        setError('CORS error: The server is not allowing this request. Please check CORS configuration.');
      } else {
        setError(`An error occurred: ${error.message}. Please try again.`);
      }
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center' }}>Financial Model Calculator</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div>
          <label htmlFor="revenue">Revenue</label>
          <input
            id="revenue"
            type="number"
            value={revenue}
            onChange={(e) => setRevenue(e.target.value)}
            required
            placeholder="Enter revenue"
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        <div>
          <label htmlFor="costs">Costs</label>
          <input
            id="costs"
            type="number"
            value={costs}
            onChange={(e) => setCosts(e.target.value)}
            required
            placeholder="Enter costs"
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
          Calculate
        </button>
      </form>

      {error && (
        <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#ffcccc', color: '#ff0000' }}>
          {error}
        </div>
      )}

      {result && (
        <div style={{ marginTop: '10px' }}>
          <h3>Result:</h3>
          <p>Profit/Loss: ${result.profit_loss.toFixed(2)}</p>
          <p>Status: {result.message}</p>
        </div>
      )}
    </div>
  );
};

export default FinancialModel;