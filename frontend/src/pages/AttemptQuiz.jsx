// src/pages/AttemptQuiz.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

export default function AttemptQuiz() {
  const { quizId } = useParams();
  const [questions, setQuestions] = useState([]);
  // answers: { "<questionId>": "A", ... }
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    API.get(`/questions/quiz/${quizId}`)
      .then((res) => setQuestions(res.data))
      .catch((err) => console.error(err));
  }, [quizId]);

  const handleChange = (qid, optionLetter) => {
    setAnswers((prev) => ({ ...prev, [qid]: optionLetter }));
  };

  const submitQuiz = async () => {
    try {
      const body = { answers }; // backend expects a Map<Long,String>
      const res = await API.post(`/quiz/submission/${quizId}`, body);
      // your backend returns plain string like "You scored X/Y"
      alert(res.data);
    } catch (err) {
      console.error(err);
      alert("Submission failed");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Attempt Quiz</h1>

      {questions.map((q) => (
        <div key={q.id} className="mb-4 border p-4 rounded">
          <p className="font-bold mb-2">{q.questionText}</p>

          <label className="block">
            <input
              type="radio"
              name={`q-${q.id}`}
              onChange={() => handleChange(q.id, "A")}
              checked={answers[q.id] === "A"}
              className="mr-2"
            />
            A. {q.optionA}
          </label>

          <label className="block">
            <input
              type="radio"
              name={`q-${q.id}`}
              onChange={() => handleChange(q.id, "B")}
              checked={answers[q.id] === "B"}
              className="mr-2"
            />
            B. {q.optionB}
          </label>

          <label className="block">
            <input
              type="radio"
              name={`q-${q.id}`}
              onChange={() => handleChange(q.id, "C")}
              checked={answers[q.id] === "C"}
              className="mr-2"
            />
            C. {q.optionC}
          </label>

          <label className="block">
            <input
              type="radio"
              name={`q-${q.id}`}
              onChange={() => handleChange(q.id, "D")}
              checked={answers[q.id] === "D"}
              className="mr-2"
            />
            D. {q.optionD}
          </label>
        </div>
      ))}

      <button onClick={submitQuiz} className="bg-green-600 text-white px-4 py-2 rounded">
        Submit Quiz
      </button>
    </div>
  );
}
