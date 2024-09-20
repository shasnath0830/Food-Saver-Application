import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function ChartT({ customData }) {
  const { labels, dataValues } = processData(customData);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'Data',
        data: dataValues,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
      },
    ],
  };

  return <Bar options={options} data={data} />;
}

function processData(data) {
    console.log(data)
  const labels = Object.keys(data);
  const dataValues = Object.values(data);
  return { labels, dataValues };
}
