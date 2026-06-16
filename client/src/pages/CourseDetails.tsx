import { useParams, useNavigate, Link } from "react-router-dom";
import CourseHeader from "../components/ui/CourseHeader";
import CourseDescription from "../components/ui/CourseDescription";
import CourseActionBlock from "../components/CourseActionBlock";
import { useAuth } from "../hooks/useAuth";
import styles from "../styles/CourseDetails.module.css";
import arrow from '../assets/arrow-sm-left-svgrepo-com.svg'

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Мок
  const mockCourse = {
    title: "Название курса",
    rating: 0,
    price: 1200,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dignissim nibh diam, ut ornare arcu sodales eget. Cras arcu lorem, sagittis eu quam et, bibendum placerat lectus. Suspendisse potenti. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam venenatis justo at est hendrerit, eget volutpat elit sagittis. Ut quis orci at justo placerat semper. Mauris viverra finibus sapien quis euismod. In porta nisl ac velit maximus egestas. Aliquam erat volutpat. Cras pretium tellus ac libero lobortis, nec mattis ipsum gravida. Integer ut lorem congue, mattis nunc quis, pharetra mauris.\n\nEtiam vel placerat ipsum. Donec egestas nunc odio, sed viverra mi interdum quis. Pellentesque vulputate, felis in facilisis dictum, eros tellus dictum sapien, venenatis vulputate est lacus a neque. Etiam luctus eros vel felis finibus, id eleifend nisi consequat. Duis iaculis, enim id iaculis maximus, neque tortor molestie lorem, in vestibulum sem lorem vel ante. Phasellus id elementum leo, a euismod odio. Phasellus bibendum lobortis elit at sodales. Maecenas et risus mattis, gravida mauris non, lobortis lectus. Donec egestas lacinia nisl, eu fringilla velit iaculis quis. In consequat, neque ut porttitor volutpat, quam tellus viverra massa, vitae suscipit augue risus vitae nulla.",
    isPurchased: false
  };

  const handleActionClick = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    // Здесь будет логика покупки или перехода к урокам
    console.log("Действие с курсом:", id);
  };

  return (
    <div className={styles.container}>
      
      <button 
        onClick={() => navigate("/catalog")} 
        className={styles.backButton}
        aria-label="Вернуться к каталогу курсов"
      >
        <img 
          src={arrow} 
          alt="Назад" 
          className={styles.backButtonIcon} 
        />
        <span>Назад ко всем курсам</span>
      </button>

      <div className={styles.courseGrid}>
        
        <div className={styles.leftColumn}>
          <CourseHeader 
            title={mockCourse.title} 
            rating={mockCourse.rating} 
            price={mockCourse.price} 
          />
          <CourseDescription text={mockCourse.description} />
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.imagePlaceholder}>
            image: fill
          </div>

          <CourseActionBlock 
            isPurchased={mockCourse.isPurchased} 
            onActionClick={handleActionClick} 
          />

          
        </div>

      </div>
    </div>
  );
}