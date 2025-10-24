import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

export default function CourseAnalytics() {
  const { courseId } = useParams();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    API.get(`/courses/${courseId}/students/progress`)
      .then(res => setStudents(res.data))
      .catch(err => console.error(err));
  }, [courseId]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Student Progress</h1>
      {students.length === 0 ? (
        <p>No students enrolled yet.</p>
      ) : (
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Student Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Progress</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50">
                <td className="border p-2">{s.name}</td>
                <td className="border p-2">{s.email}</td>
                <td className="border p-2">
                  <div className="w-full bg-gray-200 h-4 rounded">
                    <div
                      className="bg-blue-600 h-4 rounded"
                      style={{ width: `${s.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm">{s.progress}%</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
