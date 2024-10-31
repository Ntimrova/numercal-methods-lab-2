import { useState } from "react";
import {
  integrateRectangleMethod,
  integrateTrapezoidalMethod,
  integrateMonteCarloMethod,
  func,
  intervals,
  analyticValue,
} from "../utils/methods";
import calculatorIcon from "../icon/free-icon-computer-science-3581229.png";
import styles from "../styles/App.module.css"; 
import Graph from "./Graph";

const App = () => {
  const [results, setResults] = useState([]);
  const [a, setA] = useState(0.6);
  const [b, setB] = useState(1.4);

  const calculateIntegrals = () => {
    const calculations = intervals.map((n) => {
      const rectangleResult = integrateRectangleMethod(func, a, b, n);
      const trapezoidalResult = integrateTrapezoidalMethod(func, a, b, n);
      const monteCarloResult = integrateMonteCarloMethod(func, a, b, n);
      return {
        n,
        analyticValue,
        rectangleMethod: rectangleResult,
        trapezoidalMethod: trapezoidalResult,
        monteCarloMethod: monteCarloResult,
      };
    });
    setResults(calculations);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Числові методи обчислення інтегралів
        <img src={calculatorIcon} alt="Calculator Icon" className={styles.icon} />
      </h1>

      <p className={styles.subtitle}>
        Обчислити визначений інтеграл <strong>∫ x² cos(x) dx</strong>
      </p>
      <Graph func={func} a={a} b={b} />

      <div className={styles.inputGroup}>
        <label className={styles.label}>
          Нижня межа (a):
          <input
            type="number"
            value={a}
            onChange={(e) => setA(parseFloat(e.target.value))}
          />
        </label>
        <label className={styles.label}>
          Верхня межа (b):
          <input
            type="number"
            value={b}
            onChange={(e) => setB(parseFloat(e.target.value))}
          />
        </label>
      </div>
      
      <button onClick={calculateIntegrals} className={styles.button}>Обчислити</button> 

      {results.length > 0 && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>N</th>
              <th>Аналітичне значення</th>
              <th>Метод прямокутників</th>
              <th>Метод трапецій</th>
              <th>Метод Монте-Карло</th>
            </tr>
          </thead>
          <tbody>
            {results.map((row) => (
              <tr key={row.n}>
                <td>{row.n}</td>
                <td>{row.analyticValue.toFixed(6)}</td>
                <td>{row.rectangleMethod.toFixed(6)}</td>
                <td>{row.trapezoidalMethod.toFixed(6)}</td>
                <td>{row.monteCarloMethod.toFixed(6)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      
    </div>
  );
};

export default App;
