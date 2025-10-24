import { useEffect, useState } from "react";
import API from "../api/axios";

export default function AllCourses() {
  const [courses, setCourses] = useState([]);
  const [enrolledIds, setEnrolledIds] = useState([]);

  useEffect(() => {
    // Fetch all courses
    API.get("/courses")
      .then((res) => setCourses(res.data))
      .catch((err) => console.error(err));

    // Fetch user's enrolled courses
    API.get("/enroll/my")
      .then((res) => setEnrolledIds(res.data.map((c) => c.id)))
      .catch((err) => console.error(err));
  }, []);

  const handleEnroll = async (courseId) => {
    try {
      await API.post(`/enroll/${courseId}`);
      alert("Enrolled successfully!");
      setEnrolledIds([...enrolledIds, courseId]);
    } catch (err) {
      console.error(err);
      alert("Already enrolled or error occurred");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Available Courses</h1>

      {courses.length === 0 ? (
        <p>No courses available yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.map((course) => (
            <div key={course.id} className="border p-4 rounded shadow">
              <h2 className="font-bold text-xl">{course.title}</h2>
              <p className="text-gray-600 mb-2">{course.description}</p>

              {enrolledIds.includes(course.id) ? (
                <button className="bg-gray-400 text-white px-3 py-1 rounded cursor-not-allowed">
                  Enrolled
                </button>
              ) : (
                <button
                  onClick={() => handleEnroll(course.id)}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  Enroll
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
