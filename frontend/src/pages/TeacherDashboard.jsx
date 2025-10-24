import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function TeacherDashboard() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const teacherId = localStorage.getItem("userId");

  useEffect(() => {
    if (!teacherId) return;
    API.get(`/courses/teacher/${teacherId}`)
      .then((res) => setCourses(res.data))
      .catch((err) => console.error(err));
  }, [teacherId]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Teacher Dashboard</h1>

      {courses.length === 0 ? (
        <p>No courses found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.map((course) => (
            <div key={course.id} className="border rounded-lg p-4 shadow">
              <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
              <p className="text-gray-600 mb-2">{course.description}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/courses/${course.id}/quizzes`)}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Manage Quizzes
                </button>
                <button
                  onClick={() => navigate(`/courses/${course.id}/students`)}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  View Students
                </button>
                <button
                  onClick={() => navigate(`/teacher/course/${course.id}/analytics`)}
                  className="bg-yellow-600 text-white px-3 py-1 rounded"
                >
                  View Analytics
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      
    </div>
  );
}
