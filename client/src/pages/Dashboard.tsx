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
  const myCourses: Course[] = [
    { id: 0, title: "Курс 1", progress: 50 },
    { id: 1, title: "Название курса", progress: 75 },
    { id: 2, title: "JavaScript Pro", progress: 30 },
    { id: 0, title: "Курс 1", progress: 50 },
    { id: 1, title: "Название курса", progress: 75 },
    { id: 2, title: "JavaScript Pro", progress: 30 },
    { id: 0, title: "Курс 1", progress: 50 },
    { id: 1, title: "Название курса", progress: 75 },
    { id: 2, title: "JavaScript Pro", progress: 30 },
  ];

  return (
    <div className="h-screen overflow-hidden">
      <Sidebar />

      <div className="ml-[230px] flex h-screen flex-col">
        <Header />
        <main className="mt-[56px] h-[calc(100vh-56px)] overflow-y-auto py-6 px-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Привет, {name}!
          </h2>

          <section>
            <h1 className="mb-6 text-2xl font-bold">Мои курсы</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
