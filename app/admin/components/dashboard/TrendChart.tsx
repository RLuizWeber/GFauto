"use client";

import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';

// Registrar os componentes necessários do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface TrendChartProps {
  title: string;
  labels: string[]; // Datas ou períodos para o eixo X
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }[];
  isLoading?: boolean;
}

const TrendChart: React.FC<TrendChartProps> = ({
  title,
  labels,
  datasets,
  isLoading = false
}) => {
  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
          weight: 'bold'
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0 // Garante que os valores no eixo Y sejam inteiros
        }
      }
    }
  };

  const data = {
    labels,
    datasets
  };

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md h-80 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-8"></div>
        <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
          <p className="text-gray-400">Carregando dados...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="h-80">
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export default TrendChart;
