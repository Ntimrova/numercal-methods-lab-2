import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const Graph = ({ func, a, b, n = 10, method = 'rectangle' }) => {
  const h = (b - a) / n; 
  const xValues = Array.from({ length: 1000 }, (_, i) => a + (i * (b - a)) / 999);
  const yValues = xValues.map(func);
  const yMax = Math.max(...yValues) * 1.1;

  let data;

  if (method === 'rectangle') {
    const rectangleX = Array.from({ length: n }, (_, i) => a + i * h);
    const rectangleY = rectangleX.map(func);

    data = {
      labels: xValues,
      datasets: [
        {
          label: 'f(x) = x^2 * cos(x)',
          data: yValues,
          borderColor: 'blue',
          pointRadius: 0,
          borderWidth: 2,
        },
        {
          label: 'Rectangle Approximation',
          type: 'line',
          data: rectangleX.flatMap((x, i) => [
            { x, y: 0 },
            { x, y: rectangleY[i] },
            { x: x + h, y: rectangleY[i] },
            { x: x + h, y: 0 },
          ]),
          borderColor: 'red',
          fill: false,
          pointRadius: 0,
          borderWidth: 1,
          stepped: true,
        },
      ],
    };
  } else if (method === 'trapezoidal') {
    const trapezoidX = Array.from({ length: n + 1 }, (_, i) => a + i * h);
    const trapezoidY = trapezoidX.map(func);

    data = {
      labels: xValues,
      datasets: [
        {
          label: 'f(x) = x^2 * cos(x)',
          data: yValues,
          borderColor: 'blue',
          pointRadius: 0,
          borderWidth: 2,
        },
        {
          label: 'Trapezoidal Approximation',
          type: 'line',
          data: trapezoidX.flatMap((x, i) => [
            { x, y: 0 },
            { x, y: trapezoidY[i] },
            { x: x + h, y: i < trapezoidY.length - 1 ? trapezoidY[i + 1] : trapezoidY[i] },
            { x: x + h, y: 0 },
          ]),
          borderColor: 'rgba(0, 0, 255, 0.6)',
          fill: false,
          pointRadius: 0,
          borderWidth: 1,
          stepped: false,
        },
      ],
    };
  } else if (method === 'monteCarlo') {
    const monteCarloPoints = Array.from({ length: 100 }, () => {
      const x = a + Math.random() * (b - a);
      const y = Math.random() * yMax;
      const isBelow = y <= func(x);
      return { x, y, isBelow };
    });

    const belowPoints = monteCarloPoints.filter((p) => p.isBelow);
    const abovePoints = monteCarloPoints.filter((p) => !p.isBelow);

    data = {
      labels: xValues,
      datasets: [
        {
          label: 'f(x) = x^2 * cos(x)',
          data: yValues,
          borderColor: 'blue',
          pointRadius: 0,
          borderWidth: 2,
        },
        {
          label: 'Points below curve',
          data: belowPoints.map((p) => ({ x: p.x, y: p.y })),
          backgroundColor: 'rgba(0, 255, 0, 0.5)',
          pointRadius: 3,
          type: 'scatter',
        },
        {
          label: 'Points above curve',
          data: abovePoints.map((p) => ({ x: p.x, y: p.y })),
          backgroundColor: 'rgba(255, 0, 0, 0.5)',
          pointRadius: 3,
          type: 'scatter',
        },
      ],
    };
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'linear',
        min: a,
        max: b,
      },
      y: {
        min: 0,
        max: yMax,
      },
    },
  };

  return (
    <div style={{ width: '300px', height: '300px', margin: '0 10px' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default Graph;
