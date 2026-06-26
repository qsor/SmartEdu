import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import CourseHeader from "../components/ui/CourseHeader";
import CourseDescription from "../components/ui/CourseDescription";
import CourseActionBlock from "../components/CourseActionBlock";
import api from "@/api/instance";
import styles from "../styles/CourseDetails.module.css";
import arrow from '../assets/arrow-sm-left-svgrepo-com.svg';

interface Lesson {
  id: string;
  title: string;
  short_description: string;
  xp: number;
}

interface CourseDetailsData {
  courseId: string;
  title?: string;
  longDescription: string;
  rating: number;
  price?: number;
  lessons: Lesson[];
}

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState<CourseDetailsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    
    setIsLoading(true);
    setError(null);

    const fetchCourse = async () => {
      try {
        const response: AxiosResponse<CourseDetailsData> = await api.get<CourseDetailsData>(`/course/${id}`);
        setCourse(response.data);
      } catch (err) {
        console.error("Ошибка при загрузке деталей курса:", err);
        setError("Не удалось загрузить информацию о курсе.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (isLoading) {
    return <div className="p-8 text-center text-gray-500 font-medium">Загрузка курса...</div>;
  }

  if (error || !course) {
    return (
      <div className="p-8 text-center flex flex-col items-center gap-4">
        <p className="text-gray-500 font-medium">{error || "Курс не найден"}</p>
        <button onClick={() => navigate("/catalog")} className="text-orange-500 font-semibold underline">
          Вернуться в каталог
        </button>
      </div>
    );
  }

  const coursePrice = course.price !== undefined ? course.price : 0;
  const courseTitle = course.title || "Изучаемый курс";

  return (
    <div className={styles.container}>
      {/* Кнопка назад */}
      <button onClick={() => navigate("/catalog")} className={styles.backButton}>
        <img src={arrow} alt="Назад" className={styles.backButtonIcon} />
        <span>Назад ко всем курсам</span>
      </button>

      <div className={styles.courseGrid}>
        {/* Левая колонка: Описание и Программа */}
        <div className={styles.leftColumn}>
          <CourseHeader title={courseTitle} rating={course.rating} price={coursePrice} />
          <CourseDescription text={course.longDescription} />
          
          {/* Секция: Программа курса */}
          <div className="mt-8 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Программа обучения</h2>
            
            {course.lessons && course.lessons.length > 0 ? (
              <div className="flex flex-col gap-4">
                {course.lessons.map((lesson, index) => (
                  <div 
                    key={lesson.id} 
                    onClick={() => navigate(`/course/${id}/lesson/${lesson.id}`)}
                    className="flex items-start gap-4 p-4 border border-gray-100 rounded-xl bg-gray-50 hover:bg-orange-50/50 hover:border-orange-300 transition-all cursor-pointer group"
                  >
                    <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm shrink-0 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center gap-2 mb-1">
                        <h4 className="font-bold text-gray-900 text-base truncate group-hover:text-orange-600 transition-colors">
                          {lesson.title}
                        </h4>
                        <span className="text-xs font-semibold text-gray-400 bg-white px-2 py-1 rounded-md border border-gray-100 shrink-0">
                          +{lesson.xp} XP
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                        {lesson.short_description || "В этом уроке мы разберем ключевые концепции темы."}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400 italic">Программа курса находится в разработке.</p>
            )}
          </div>
        </div>

        {/* Правая колонка */}
        <div className={styles.rightColumn}>
          <div className={styles.imagePlaceholder}>Обложка курса</div>
          <CourseActionBlock courseId={id!} price={coursePrice} />
        </div>
      </div>
    </div>
  );
}