import React from 'react';

interface CourseDescriptionProps {
  text: string;
}

const CourseDescription: React.FC<CourseDescriptionProps> = ({ text }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 text-gray-700 whitespace-pre-line">
      {text}
    </div>
  );
};

export default CourseDescription;