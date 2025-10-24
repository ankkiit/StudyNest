import { useEffect, useState } from "react";
import API from "../api/axios";

export default function CourseProgress({ courseId }) {
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    API.get(`/courses/${courseId}/completion`)
      .then((res) => setProgress(res.data))
      .catch((err) => console.error(err));
  }, [courseId]);

  if (!progress) return <p>Loading progress...</p>;

  return (
    <div className="border p-4 rounded shadow mt-4">
      <h3 className="font-bold mb-2">Course Progress</h3>
      <p>Lessons Completed: {progress.completedLessons} / {progress.totalLessons}</p>
      <p>Quizzes Attempted: {progress.completedQuizzes} / {progress.totalQuizzes}</p>
      <div className="w-full bg-gray-200 rounded h-4 mt-2">
        <div
          className="bg-green-500 h-4 rounded"
          style={{ width: `${progress.progressPercentage}%` }}
        ></div>
      </div>
      <p className="mt-1 font-semibold">{progress.progressPercentage}% Completed</p>
    </div>
  );
}
