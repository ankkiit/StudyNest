// src/pages/AddQuestion.jsx
import { useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

export default function AddQuestion() {
  const { quizId } = useParams();
  const [q, setQ] = useState({
    questionText: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: "", // "A" | "B" | "C" | "D"
  });

  const handleChange = (e) => setQ({ ...q, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post(`/questions/add/${quizId}`, q);
      alert("Question added!");
      setQ({ questionText: "", optionA: "", optionB: "", optionC: "", optionD: "", correctAnswer: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to add question");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add Question</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="questionText" value={q.questionText} onChange={handleChange} placeholder="Question Text" className="border p-2 w-full rounded" />
        <input name="optionA" value={q.optionA} onChange={handleChange} placeholder="Option A" className="border p-2 w-full rounded" />
        <input name="optionB" value={q.optionB} onChange={handleChange} placeholder="Option B" className="border p-2 w-full rounded" />
        <input name="optionC" value={q.optionC} onChange={handleChange} placeholder="Option C" className="border p-2 w-full rounded" />
        <input name="optionD" value={q.optionD} onChange={handleChange} placeholder="Option D" className="border p-2 w-full rounded" />
        <input name="correctAnswer" value={q.correctAnswer} onChange={handleChange} placeholder="Correct Answer (A/B/C/D)" className="border p-2 w-full rounded" />
        <button type="submit" className="bg-blue-600 text-white px-3 py-2 rounded">Add Question</button>
      </form>
    </div>
  );
}
