import React, { useState } from 'react';

interface StarRatingAdvancedProps {
  rating?: number;           // может быть 4.5
  maxStars?: number;
  size?: 'w-4 h-4' | 'w-5 h-5' | 'w-6 h-6' | 'w-8 h-8';
  activeColor?: string;
  inactiveColor?: string;
  showNumber?: boolean;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}

const StarRatingAdvanced: React.FC<StarRatingAdvancedProps> = ({ 
  rating = 0,
  maxStars = 5,
  size = 'w-5 h-5',
  activeColor = 'text-yellow-400',
  inactiveColor = 'text-gray-300',
  showNumber = true,
  interactive = false,
  onRatingChange = null
}) => {
  const [hoverRating, setHoverRating] = useState<number>(0);
  
  const calculateRating = (index: number, clientX: number, element: HTMLElement) => {
    if (!interactive) return;
    
    const rect = element.getBoundingClientRect();
    const clickPosition = clientX - rect.left;
    const starWidth = rect.width;
    const isHalfStar = clickPosition < starWidth / 2;
    
    const newRating = isHalfStar ? index + 0.5 : index + 1;
    onRatingChange && onRatingChange(newRating);
  };

  const renderStar = (index: number, currentRating: number, isHovered: boolean = false) => {
    const ratingValue = isHovered ? hoverRating : currentRating;
    const isFullStar = ratingValue >= index + 1;
    const isHalfStar = ratingValue >= index + 0.5 && ratingValue < index + 1;
    
    if (isFullStar) {
    
      return (
        <svg className={`${size} ${activeColor} fill-current`} viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    } else if (isHalfStar) {

      return (
        <svg className={`${size} ${activeColor}`} viewBox="0 0 20 20">
          <defs>
            <linearGradient id={`half-gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="#e5e7eb" />
            </linearGradient>
          </defs>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" fill={`url(#half-gradient-${index})`} />
        </svg>
      );
    } else {
      return (
        <svg className={`${size} ${inactiveColor} fill-current`} viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
  };

  return (
    <div className="flex items-center gap-1">
      <div className="flex gap-0.5">
        {[...Array(maxStars)].map((_, index) => (
          <div
            key={index}
            className={interactive ? 'cursor-pointer' : ''}
            onClick={(e) => calculateRating(index, e.clientX, e.currentTarget)}
            onMouseEnter={() => interactive && setHoverRating(rating)}
            onMouseLeave={() => interactive && setHoverRating(0)}
          >
            {renderStar(index, rating, false)}
          </div>
        ))}
      </div>
      {showNumber && (
        <span className="ml-1 text-sm text-gray-600">{rating}</span>
      )}
    </div>
  );
};

export default StarRatingAdvanced;