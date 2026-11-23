import React from 'react';
import { useSelector } from 'react-redux';
import {
  chartZondUpSelector,
  chartKrayUpSelector,
  chartBarUpSelector,
} from '../../../Redux/Formula/selectors';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartData, // Импортируем тип, если понадобится
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

export default function IntersectChart1828Up() {
  const zond1828VestData = useSelector(chartZondUpSelector);
  const yasen1828VestData = useSelector(chartKrayUpSelector);
  const bar1828VestData = useSelector(chartBarUpSelector);

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
          label: function (context: any) {
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
          display: false,
        },
        title: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          display: false,
        },
        title: {
          display: false,
        },
        grid: {
          display: false,
        },
        min: -19,
        max: 19,
      },
    },
  };

  // Указываем тип как any, так как здесь смешаны Line и Bar датасеты
  const data: any = {
    labels: Array(65).fill(''), // Сделал чуть короче и чище через Array(65).fill('')
    datasets: [
      {
        label: 'Глибина зондування',
        pointRadius: 0,
        borderWidth: 2,
        data: zond1828VestData,
        borderColor: 'red',
        fill: 'rgba(243, 128, 153, 0.4)',
      },
      {
        label: 'Ясений край',
        pointRadius: 0,
        borderWidth: 2,
        data: yasen1828VestData,
        borderColor: 'blue',
        fill: '-1',
      },
      {
        type: 'bar',
        options: {
          barPercentage: 1,
        },
        backgroundColor: 'green',
        barThickness: 1,
        data: bar1828VestData,
      },
    ],
  };

  return (
    <>
      <div style={{ width: '1200px', height: '100px' }} className="chart-intersect-up">
        <Line data={data} options={options} height={100} />
      </div>
    </>
  );
}
