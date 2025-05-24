"use client";
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registre os componentes necessários
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface FunnelChartProps {
  data: {
    labels: string[];
    values: number[];
  };
  title?: string;
}

const FunnelChart: React.FC<FunnelChartProps> = ({ data, title = 'Funil de Conversão' }) => {
  // Configuração para simular um gráfico de funil usando Bar
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Conversões',
        data: data.values,
        backgroundColor: [
          'rgba(54, 162, 235, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)',
          'rgba(255, 99, 132, 0.8)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: !!title,
        text: title,
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default FunnelChart;