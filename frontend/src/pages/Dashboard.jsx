import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome to LMS Dashboard</h1>
      <p>Here you can access Courses, Lessons, and Quizzes.</p>

      <div className="flex gap-4 mt-4">
        <button
          onClick={() => navigate("/courses-All")}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Browse Courses
        </button>

        <button
          onClick={() => navigate("/my-courses")}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          My Courses
        </button>

        <button
          onClick={() => navigate("/submissions")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          My Submissions
        </button>
      </div>
    </div>
  );
}
