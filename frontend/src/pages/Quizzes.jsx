import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";

export default function Quizzes() {
  const { courseId } = useParams(); // route: /courses/:courseId/quizzes
  const [quizzes, setQuizzes] = useState([]);
  const [title, setTitle] = useState("");
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  // Get user role from token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setRole(decoded.role);
    }
  }, []);

  // Fetch quizzes for course
  useEffect(() => {
    API.get(`/quiz/course/${courseId}`)
      .then((res) => {
        console.log("Quiz API Response:", res.data);
        setQuizzes(res.data);
      })
      .catch((err) => console.error(err));
  }, [courseId]);

  // Create quiz (Teacher only)
  const createQuiz = async () => {
    if (!title) return alert("Enter quiz title");
    try {
      const res = await API.post(`/quiz/create/${courseId}`, { title });
      setQuizzes((s) => [...s, res.data]);
      setTitle("");
      alert("Quiz created!");
    } catch (err) {
      console.error(err);
      alert("Failed to create quiz");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Quizzes</h1>

      {/* Only teacher can create a quiz */}
      {role === "TEACHER" && (
        <div className="mb-6">
          <input
            type="text"
            placeholder="Quiz Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded mr-2"
          />
          <button
            onClick={createQuiz}
            className="bg-blue-600 text-white px-3 py-2 rounded"
          >
            Create Quiz
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="border p-4 rounded shadow">
            <h2 className="font-bold text-xl">{quiz.title}</h2>
            <div className="flex gap-2 mt-2">
              {/* Only students can attempt */}
              {role === "STUDENT" && (
                <button
                  className="bg-green-600 text-white px-3 py-1 rounded"
                  onClick={() =>
                    navigate(`/courses/${courseId}/quizzes/${quiz.id}/attempt`)
                  }
                >
                  Attempt
                </button>
              )}

              {/* Only teachers can add questions */}
              {role === "TEACHER" && (
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                  onClick={() =>
                    navigate(`/courses/${courseId}/quizzes/${quiz.id}/add-question`)
                  }
                >
                  Add Question
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
