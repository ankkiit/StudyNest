import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function TeacherDashboard() {
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newCourse, setNewCourse] = useState({ title: "", description: "" });
  const navigate = useNavigate();
  const teacherId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  // Fetch courses by teacher
  useEffect(() => {
    if (!teacherId) return;
    API.get(`/courses/teacher/${teacherId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => setCourses(res.data))
      .catch((err) => console.error(err));
  }, [teacherId, token]);

  // Create course
  const handleCreateCourse = (e) => {
    e.preventDefault();

    if (!newCourse.title.trim() || !newCourse.description.trim()) {
      alert("Please fill all fields");
      return;
    }

    API.post("/courses/create", newCourse, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        alert("Course created successfully!");
        setCourses([...courses, res.data]);
        setShowModal(false);
        setNewCourse({ title: "", description: "" });
      })
      .catch((err) => {
        console.error(err);
        alert("Error creating course");
      });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
       
      </div>

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
                  onClick={() =>
                    navigate(`/teacher/course/${course.id}/analytics`)
                  }
                  className="bg-yellow-600 text-white px-3 py-1 rounded"
                >
                  View Analytics
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for Create Course */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Create New Course</h2>
            <form onSubmit={handleCreateCourse}>
              <input
                type="text"
                placeholder="Course Title"
                value={newCourse.title}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, title: e.target.value })
                }
                className="w-full border px-3 py-2 rounded mb-3 focus:outline-none"
              />
              <textarea
                placeholder="Course Description"
                value={newCourse.description}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, description: e.target.value })
                }
                className="w-full border px-3 py-2 rounded mb-3 focus:outline-none"
                rows="3"
              ></textarea>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-400 rounded text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 rounded text-white hover:bg-blue-700"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
