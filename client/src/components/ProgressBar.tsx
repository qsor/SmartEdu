import React from 'react';

interface ProgressBarProps {
  progress?: number;       
  showPercentage?: boolean; 
  height?: 'h-1' | 'h-2' | 'h-3' | 'h-4';
  barColor?: string;
  trackColor?: string;
  label?: string;           
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress = 0,
  showPercentage = true,
  height = 'h-2',
  barColor = 'bg-orange-500',
  trackColor = 'bg-gray-200',
  label = 'Прогресс',
  className = ''
}) => {
  const clampedProgress = Math.min(100, Math.max(0, progress));
  
  return (
    <div className={`w-full ${className}`}>
      {/* Заголовок с процентом */}
      {showPercentage && (
        <div className="flex justify-between items-center mb-1">
          {label && <span className="text-sm text-gray-600">{label}</span>}
          <span className="text-sm font-medium text-gray-700">{clampedProgress}%</span>
        </div>
      )}
      
      {/* Трек (серая полоса) */}
      <div className={`w-full ${trackColor} rounded-full overflow-hidden ${height}`}>
        {/* Заливка (оранжевая полоса) */}
        <div 
          className={`${barColor} rounded-full transition-all duration-500 ease-out ${height}`}
          style={{ width: `${clampedProgress}%` }}
          role="progressbar"
          aria-valuenow={clampedProgress}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
};

export default ProgressBar;