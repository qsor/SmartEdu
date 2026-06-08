import { Sidebar } from "../components/Sidebar";
import DashboardCourseCard from "../components/DashboardCourseCard";
import Header from "@/components/Header";

interface Course {
  id: number;
  title: string;
  progress: number;
}

export const Dashboard: React.FC = ({}) => {
  const name = "NoName";
  // Данные пользователя (позже из Redux/API)
  const mainCourse: Course = {
    id: 0,
    title: "Тестовый курс",
    progress: 80,
  };

  const myCourses: Course[] = [
    { id: 1, title: "Курс 1", progress: 50 },
    { id: 2, title: "Название курса", progress: 75 },
    { id: 3, title: "JavaScript Pro", progress: 30 },
    { id: 4, title: "TypeScript Pro", progress: 30 },
  ];

  return (
    <div className="h-screen overflow-hidden">
      <Sidebar />

      <div className="ml-[230px] flex h-screen flex-col">
        <Header />
        <main className="mt-[56px] h-[calc(100vh-56px)] overflow-y-auto py-6 px-12">
          <h2 className="mb-10 text-3xl font-bold text-gray-900">
            Привет, {name}!
          </h2>

          <section>
            <h3 className="mb-6 text-2xl font-bold">Продолжить курс</h3>
            <DashboardCourseCard
              key={mainCourse.id}
              title={mainCourse.title}
              progress={mainCourse.progress}
              isMain={true}
            />
          </section>

          <section>
            <h3 className="my-6 text-2xl font-bold">Мои курсы</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {myCourses.map((course) => (
                <DashboardCourseCard
                  key={course.id}
                  title={course.title}
                  progress={course.progress}
                />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
