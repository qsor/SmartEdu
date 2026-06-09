import { useParams } from "react-router-dom";

export default function CourseDetails() {
  const { id } = useParams();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">
        Описание курса (ID: {id})
      </h1>
      <p className="mt-4 text-gray-600">
        PUPUPU
      </p>
    </div>
  );
}