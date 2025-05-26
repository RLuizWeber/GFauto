"use client";

import React from 'react';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number; // Variação percentual (positiva ou negativa)
  icon?: React.ReactNode;
  isLoading?: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  icon,
  isLoading = false
}) => {
  // Determina a cor baseada na variação percentual
  const getChangeColor = () => {
    if (!change) return 'text-gray-500';
    return change >= 0 ? 'text-green-500' : 'text-red-500';
  };

  // Formata a variação percentual com sinal e ícone
  const renderChange = () => {
    if (change === undefined) return null;
    
    const Icon = change >= 0 ? ArrowUpIcon : ArrowDownIcon;
    const formattedChange = Math.abs(change).toFixed(1);
    
    return (
      <div className={`flex items-center ${getChangeColor()}`}>
        <Icon className="h-3 w-3 mr-1" />
        <span>{formattedChange}%</span>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/4"></div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
          {renderChange()}
        </div>
        {icon && <div className="text-gray-400">{icon}</div>}
      </div>
    </div>
  );
};

export default MetricCard;
