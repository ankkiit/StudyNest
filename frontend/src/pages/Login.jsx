import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode"; 


export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      const token = res.data;
      const decoded = jwtDecode(token);
      console.log(decoded);
      const role = decoded.role || "STUDENT";
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", decoded.id);
       localStorage.setItem("user", JSON.stringify(decoded)); 

      alert("Login successful!");
     if (role === "TEACHER") {
        navigate("/teacher/dashboard");
      } else {
        console.log(role);
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="bg-white p-6 rounded shadow-md w-96" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-4">Login</h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          required
        />

        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
