import { useState, useEffect } from "react";
import API from "../api/axios";
import { useParams, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import CourseProgress from "../pages/CourseProgress";

export default function Lessons() {
  const { courseId } = useParams();
  const [lessons, setLessons] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  // Decode token to get role once on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setRole(decoded.role);
      console.log("Decoded user:", decoded);
    }
  }, []);

  // Fetch lessons for the course
  useEffect(() => {
    API.get(`/lessons/course/${courseId}`)
      .then((res) => setLessons(res.data))
      .catch((err) => console.error(err));
  }, [courseId]);

  // Add lesson (Teacher only)
  const addLesson = async () => {
    if (!title || !content) return alert("Fill all fields");
    try {
      const res = await API.post(`/lessons/add/${courseId}`, { title, content });
      setLessons([...lessons, res.data]);
      setTitle("");
      setContent("");
      alert("Lesson added!");
    } catch (err) {
      console.error(err);
      alert("Failed to add lesson");
    }
  };

  return (
    <div className="p-6">
       <CourseProgress courseId={courseId} />
      <h1 className="text-3xl font-bold mb-4">Lessons</h1>
      {/* TEACHER SECTION */}
      {role === "TEACHER" && (
        <div className="mb-6">
          <h2 className="font-semibold mb-2">Add a new lesson</h2>
          <input
            type="text"
            placeholder="Lesson Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded mr-2"
          />
          <textarea
            placeholder="Lesson Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border p-2 rounded w-full mb-2"
          />
          <button
            onClick={addLesson}
            className="bg-blue-600 text-white px-3 py-2 rounded"
          >
            Add Lesson
          </button>
        </div>
      )}

      {/* LIST LESSONS */}
      <div className="space-y-4">
        {lessons.map((lesson) => (
          <div key={lesson.id} className="border p-4 rounded shadow">
            <h2 className="font-bold text-xl">{lesson.title}</h2>
            <p className="mb-2">{lesson.content}</p>
            <button
        onClick={() => {
          API.post(`/lessons/${lesson.id}/complete`)
            .then(() => {
              alert("Lesson marked as completed!");
            })
            .catch((err) => console.error(err));
        }}
        className="mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
      >
        Mark as Completed
      </button>
            {/* STUDENT: attempt quiz button for each lesson */}
            {role === "STUDENT" && (
              <button
                onClick={() => navigate(`/courses/${courseId}/quizzes`)}
                className="bg-green-600 text-white px-3 py-1 rounded mt-2"
              >
                Attempt Quiz
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
