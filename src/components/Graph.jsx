
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const Graph = ({ func, a, b }) => {
  
  const xValues = Array.from({ length: 1000 }, (_, i) => a + (i * (b - a)) / 999);
  const yValues = xValues.map(func);

  const data = {
    labels: xValues,
    datasets: [
      {
        label: 'f(x) = x^2 * cos(x)',
        data: yValues,
        fill: true,
        backgroundColor: 'rgba(255, 0, 0, 0.5)', 
        borderColor: 'black',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, 
    scales: {
      x: { title: { display: true, text: 'x' } },
      y: { title: { display: true, text: 'f(x)' } },
    },
  };

  return (
    <div style={{ width: '1470px', height: '330px' }}> {/* Задаємо розмір контейнера */}
      <Line data={data} options={options} />
    </div>
  );
};

export default Graph;
