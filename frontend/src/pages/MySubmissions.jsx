import { useEffect, useState } from "react";
import API from "../api/axios";

export default function MySubmissions() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    API.get("/quiz/submission/my")
      .then((res) => {
        setSubmissions(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">My Quiz Submissions</h1>

      {submissions.length === 0 ? (
        <p>No submissions yet.</p>
      ) : (
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Quiz Title</th>
              <th className="border p-2">Course</th>
              <th className="border p-2">Score</th>
              <th className="border p-2">Date</th>
            </tr>
          </thead>
          <tbody>
  {submissions.map((sub) => (
    <tr key={sub.quizId} className="hover:bg-gray-50">
      <td className="border p-2">{sub.quizTitle || "Untitled Quiz"}</td>
      <td className="border p-2">{sub.courseTitle || "N/A"}</td>
      <td className="border p-2 text-center font-semibold">{sub.score}</td>
      <td className="border p-2">
        {new Date(sub.submittedAt).toLocaleString()}
      </td>
    </tr>
  ))}
</tbody>
        </table>
      )}
    </div>
  );
}
