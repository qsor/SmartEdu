import React from 'react';

interface CertificateCardProps {
  title: string;
  category: string;
  status: 'completed' | 'in-progress' | 'unavailable';
  progress: number;
  receivedDate?: string;
  onDownload?: () => void;
  onContinue?: () => void;
}

export default function CertificateCard({
  title,
  category,
  status,
  progress,
  receivedDate,
  onDownload,
  onContinue,
}: CertificateCardProps) {
  const statusConfig = {
    completed: {
      label: 'Получен',
      bgColor: 'bg-green-100',
      textColor: 'text-green-700',
      buttonLabel: 'Скачать Сертификат',
      buttonColor: 'bg-orange-500 hover:bg-orange-600',
      buttonDisabled: false,
    },
    'in-progress': {
      label: 'В процессе',
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-700',
      buttonLabel: 'Продолжить Обучение',
      buttonColor: 'bg-yellow-200 text-yellow-700',
      buttonDisabled: false,
    },
    unavailable: {
      label: 'Недоступен',
      bgColor: 'bg-gray-100',
      textColor: 'text-gray-600',
      buttonLabel: 'Пока недоступен',
      buttonColor: 'bg-gray-200 text-gray-500',
      buttonDisabled: true,
    },
  };

  const config = statusConfig[status];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-500">{category}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${config.bgColor} ${config.textColor}`}>
          {config.label}
        </span>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-600">Прогресс</span>
          <span className="font-semibold text-gray-900">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-orange-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {receivedDate && status === 'completed' && (
        <p className="text-sm text-gray-500 mb-4">Получен: {receivedDate}</p>
      )}

      <button
        onClick={status === 'completed' ? onDownload : onContinue}
        disabled={config.buttonDisabled}
        className={`w-full py-2.5 rounded-xl font-semibold transition-colors ${config.buttonColor} ${
          config.buttonDisabled ? 'cursor-not-allowed' : 'cursor-pointer'
        }`}
      >
        {config.buttonLabel}
      </button>
    </div>
  );
}