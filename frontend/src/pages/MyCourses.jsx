import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/enroll/my")
      .then((res) => setCourses(res.data))
      .catch((err) => console.error(err));
  }, []);

  const goToCourse = (courseId) => {
    navigate(`/courses/${courseId}/lessons`);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">My Courses</h1>

      {courses.length === 0 ? (
        <p>You haven’t enrolled in any courses yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.map((course) => (
            <div key={course.id} className="border p-4 rounded shadow">
              <h2 className="font-bold text-xl">{course.title}</h2>
              <p className="text-gray-600 mb-2">{course.description}</p>
              <button
                onClick={() => goToCourse(course.id)}
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                View Lessons
              </button>
            </div>
          )
          )}
        </div>
      )}
    </div>
  );
}
