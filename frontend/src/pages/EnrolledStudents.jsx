import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

export default function EnrolledStudents() {
  const { courseId } = useParams();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    API.get(`/enroll/course/${courseId}`)
      .then((res) => setStudents(res.data))
      .catch((err) => console.error(err));
  }, [courseId]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Enrolled Students</h1>
      {students.length === 0 ? (
        <p>No students enrolled yet.</p>
      ) : (
        <ul className="space-y-2">
          {students.map((s) => (
            <li key={s.id} className="border p-2 rounded">
              {s.username || s.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
