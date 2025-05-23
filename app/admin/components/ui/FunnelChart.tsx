"use client";
import React from 'react';
import { Funnel } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';

// Registrar componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface FunnelChartProps {
  title: string;
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
      borderColor: string[];
      borderWidth: number;
    }[];
  };
  height?: number;
}

const FunnelChart: React.FC<FunnelChartProps> = ({
  title,
  data,
  height = 300
}) => {
  const options: ChartOptions<'bar'> = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
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
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm" style={{ height: `${height}px` }}>
      <Funnel options={options} data={data} />
    </div>
  );
};

export default FunnelChart;
