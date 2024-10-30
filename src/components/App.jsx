// App.js
import React, { useState } from 'react';
import { integrateRectangleMethod, integrateTrapezoidalMethod, func, intervals, analyticValue } from '../utils/methods';

const App = () => {
  const [results, setResults] = useState([]);
  const [a, setA] = useState(0.6);
  const [b, setB] = useState(1.4);

  const calculateIntegrals = () => {
    const calculations = intervals.map((n) => {
      const rectangleResult = integrateRectangleMethod(func, a, b, n);
      const trapezoidalResult = integrateTrapezoidalMethod(func, a, b, n);
      return { 
        n, 
        analyticValue, 
        rectangleMethod: rectangleResult, 
        trapezoidalMethod: trapezoidalResult 
      };
    });
    setResults(calculations);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Числові методи обчислення інтегралів</h1>

      <p>
        Обчислити визначений інтеграл <strong>∫ x² cos(x) dx</strong> на інтервалі від 
        <strong> 0.6 до 1.4</strong> чисельно методами прямокутників і трапецій для 
        п'яти значень <strong>N</strong>: <strong> N = 10, 20, 50, 100, 1000</strong>.
      </p>

      <div style={{ marginBottom: '10px' }}>
        <label>
          Нижня межа (a): 
          <input 
            type="number" 
            value={a} 
            onChange={(e) => setA(parseFloat(e.target.value))} 
          />
        </label>
        <label style={{ marginLeft: '10px' }}>
          Верхня межа (b): 
          <input 
            type="number" 
            value={b} 
            onChange={(e) => setB(parseFloat(e.target.value))} 
          />
        </label>
      </div>

      <button onClick={calculateIntegrals}>Обчислити</button>

      {results.length > 0 && (
        <table style={{ marginTop: '20px', width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>N</th>
              <th>Аналітичне значення</th>
              <th>Метод прямокутників</th>
              <th>Метод трапецій</th>
            </tr>
          </thead>
          <tbody>
            {results.map((row) => (
              <tr key={row.n}>
                <td>{row.n}</td>
                <td>{row.analyticValue.toFixed(6)}</td>
                <td>{row.rectangleMethod.toFixed(6)}</td>
                <td>{row.trapezoidalMethod.toFixed(6)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default App;
