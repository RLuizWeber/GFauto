"use client";
import React from 'react';
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: React.ReactNode;
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple';
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  changeLabel,
  icon,
  color = 'blue'
}) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    green: 'bg-green-50 text-green-700 border-green-200',
    red: 'bg-red-50 text-red-700 border-red-200',
    yellow: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200'
  };

  const iconColorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    red: 'bg-red-100 text-red-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    purple: 'bg-purple-100 text-purple-600'
  };

  return (
    <div className={`rounded-lg border p-4 ${colorClasses[color]}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          
          {(change !== undefined || changeLabel) && (
            <div className="flex items-center mt-2">
              {change !== undefined && (
                <>
                  {change > 0 ? (
                    <FiArrowUp className="text-green-500 mr-1" />
                  ) : change < 0 ? (
                    <FiArrowDown className="text-red-500 mr-1" />
                  ) : null}
                  <span className={change > 0 ? 'text-green-500' : change < 0 ? 'text-red-500' : ''}>
                    {Math.abs(change)}%
                  </span>
                </>
              )}
              {changeLabel && (
                <span className="text-xs text-gray-500 ml-1">{changeLabel}</span>
              )}
            </div>
          )}
        </div>
        
        {icon && (
          <div className={`p-3 rounded-full ${iconColorClasses[color]}`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricCard;
