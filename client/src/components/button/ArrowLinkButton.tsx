import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ArrowLinkButtonProps {
  text?: string;
  to?: string;
  onClick?: () => void;
  className?: string;
}

const ArrowLinkButton: React.FC<ArrowLinkButtonProps> = ({
  text = 'Все направления',
  to,
  onClick,
  className = '',
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (to) {
      navigate(to);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`
        group inline-flex items-center gap-3 px-6 py-3
        bg-white border border-gray-300 rounded-xl
        text-orange-500 font-medium text-base
        cursor-pointer transition-all duration-300 ease-in-out
        hover:border-orange-500 hover:shadow-lg hover:shadow-orange-500/10 hover:-translate-y-0.5
        focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2
        ${className}
      `}
      aria-label={text}
    >
      <span className="transition-colors duration-300 group-hover:text-orange-600">
        {text}
      </span>
      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-50 border border-orange-500 transition-all duration-300 group-hover:translate-x-1 group-hover:bg-orange-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 text-orange-500 transition-transform duration-300 group-hover:translate-x-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </span>
    </button>
  );
};

export default ArrowLinkButton;