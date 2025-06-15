import React from 'react';
import { useSelector } from 'react-redux';
import {
  chartZondDown2Selector,
  chartKrayDown2Selector,
  chartBarDown2Selector,
} from '../../../Redux/Formula/selectors';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  BarElement,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function IntersectChart4838DownView({ zondData, yasenData, barData }) {

  const options = {
    layout: {
      padding: 0,
    },
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';
            if (context.parsed.y !== null) {
              label = 'ГЗ:' + context.parsed.x + ' ЯК: ' + context.parsed.y;
            }
            return label;
          },
        },
      },
    },
    alignToPixels: false,
    scales: {
      x: {
        ticks: {
          display: false, // скрыть подписи на оси X
        },
        title: {
          display: false, // скрыть название оси X
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          display: false, // скрыть подписи на оси Y
        },
        title: {
          display: false, // скрыть название оси Y
        },
        grid: {
          display: false,
        },
        min: -19,
        max: 19,
      },
    },
  };

  const data = {
    labels: [
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
    ],
    datasets: [
      {
        label: 'Глибина зондування',
        pointRadius: 0,
        borderWidth: 2,
        data: zondData,
        borderColor: 'red',
        fill: 'rgba(243, 128, 153, 0.4)', // или target: 'Линия B'
      },
      {
        label: 'Ясений край',
        pointRadius: 0,
        borderWidth: 2,
        data: yasenData,
        borderColor: 'blue',
        fill: '-1', // заполняет между этой и предыдущей линией
      },
      {
        type: 'bar',
        options: {
          barPercentage: 1,
        },
        backgroundColor: 'green',
        barThickness: 1,
        with: 2,
        data: barData,
      },
    ],
  };

  return (
    <>
      <div
        style={{ width: '900px', height: '100px' }}
        className="chart-intersect-down"
      >
        <Line data={data} options={options} height={100} />
      </div>
    </>
  );
}
