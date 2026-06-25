import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CourseHeader from "../components/ui/CourseHeader";
import CourseDescription from "../components/ui/CourseDescription";
import CourseActionBlock from "../components/CourseActionBlock";
import { useAuth } from "../hooks/useAuth";
import styles from "../styles/CourseDetails.module.css";
import arrow from '../assets/arrow-sm-left-svgrepo-com.svg';

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // тест курс
  const isFreeCourse = id === '0';

  const [course, setCourse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setCourse({
        id: id,
        title: isFreeCourse ? "Тестовый бесплатный курс" : "Название курса",
        rating: isFreeCourse ? 5 : 0,
        price: isFreeCourse ? 0 : 1200,
        description: "Полное описание курса..."
      });
      setIsLoading(false);
    }, 500);
  }, [id, isFreeCourse]);

  if (isLoading) return <div className="pt-10 text-gray-400">Загрузка...</div>;

  return (
    <div className={styles.container}>
      <button onClick={() => navigate("/catalog")} className={styles.backButton}>
        <img src={arrow} alt="Назад" className={styles.backButtonIcon} />
        <span>Назад ко всем курсам</span>
      </button>

      <div className={styles.courseGrid}>
        <div className={styles.leftColumn}>
          <CourseHeader title={course.title} rating={course.rating} price={course.price} />
          <CourseDescription text={course.description} />
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.imagePlaceholder}>Обложка курса</div>
          <CourseActionBlock 
            courseId={id!} 
            price={course.price} 
          />
        </div>
      </div>
    </div>
  );
}