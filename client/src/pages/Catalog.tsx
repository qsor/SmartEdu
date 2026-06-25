import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CatalogCourseCard from '../components/CatalogCourseCard';
import { mockCourses, type MockCourse } from '../mocks/courses';

export default function CatalogPage() {
  const [courses, setCourses] = useState<MockCourse[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCourses(mockCourses);
  }, []);

  const handleCardClick = (courseId: number | string) => {
    navigate(`/course/${courseId}`);
  };

  return (
    <div className="w-full pt-10">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Каталог курсов</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 w-full">
        {courses.map((course) => (
          <CatalogCourseCard
            key={course.id}
            title={course.title}
            description={course.description}
            rating={course.rating}
            price={course.price}
            onCardClick={() => handleCardClick(course.id)}
          />
        ))}
      </div>
    </div>
  );
}
