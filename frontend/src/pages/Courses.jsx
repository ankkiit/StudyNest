import { useState, useEffect } from "react";
import API from "../api/axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";




export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState(""); // For teacher to create course

  const [form, setForm] = useState({
  title: "",
  description: "",
  category: ""
});

const navigate = useNavigate();
const [role, setRole] = useState(""); // "TEACHER" or "STUDENT"
useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    const decoded = jwt_decode(token);
    console.log("Decoded token:", decoded);
    setRole(decoded.role);
  }
}, []);
console.log("User role:", role);
  // Fetch courses
  useEffect(() => {
    API.get("/courses")
      .then((res) => setCourses(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Teacher creates course
 const createCourse = async () => {
  const { title, description, category } = form;

  if (!title || !description || !category)
    return alert("Please fill all fields");

  try {
    const res = await API.post("/courses/create", form);
    alert("Course created!");
    setCourses([...courses, res.data]);
    setForm({ title: "", description: "", category: "" });
  } catch (err) {
    console.error(err);
    alert("Failed to create course");
  }
};

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Courses</h1>

      {/* Teacher create course */}
     {role === "TEACHER" && (
  <div className="mb-6">
    <input
      type="text"
      placeholder="New course title"
      value={form.title}
      onChange={(e) => setForm({ ...form, title: e.target.value })}
      className="border p-2 rounded mb-2 w-full"
    />
    <textarea
  placeholder="Course Description"
  value={form.description}
  onChange={(e) => setForm({ ...form, description: e.target.value })}
  className="border p-2 rounded mb-2 w-full"
/>

<input
  type="text"
  placeholder="Category (e.g. Backend, Frontend)"
  value={form.category}
  onChange={(e) => setForm({ ...form, category: e.target.value })}
  className="border p-2 rounded mb-4 w-full"
/>
    <button onClick={createCourse} className="bg-blue-600 text-white px-3 py-2 rounded">
      Create Course
    </button>
  </div>
      )}

      {/* List courses */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <div key={course.id} className="border p-4 rounded shadow">
            <h2 className="font-bold text-xl">{course.title}</h2>
            <p>Teacher: {course.teacher?.username || "N/A"}</p>
           <button
  onClick={() => navigate(`/courses/${course.id}/lessons`)}
  className="mt-2 bg-green-600 text-white px-2 py-1 rounded"
>
  View Lessons
</button>
{/* Quizzes button */}
    <button
      onClick={() => navigate(`/courses/${course.id}/quizzes`)}
      className="bg-purple-600 text-white px-2 py-1 rounded"
    >
      View Quizzes
    </button>
            
          </div>
        ))}
      </div>
    </div>
  );
}
