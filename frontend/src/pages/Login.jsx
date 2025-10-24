import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import jwtDecode from "jwt-decode";
import { motion } from "framer-motion";

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
      const role = decoded.role || "STUDENT";

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", decoded.id);
      localStorage.setItem("user", JSON.stringify(decoded));

      alert("Login successful!");
      if (role === "TEACHER") {
        navigate("/teacher/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <motion.form
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl w-96"
      >
        {/* Branding */}
        <div className="flex flex-col items-center mb-6">
          <img
            src="/studynest.png"
            alt="StudyNest Logo"
            className="w-16 h-16 mb-2"
          />
          <h2 className="text-3xl font-bold text-purple-600">StudyNest</h2>
        </div>

        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Welcome Back 👋
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Login to continue your learning journey
        </p>

        {/* Form Inputs */}
        <div className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />

          {/* Remember & Forgot */}
          <div className="flex justify-between items-center text-sm text-gray-600">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="accent-purple-500" />
              <span>Remember me</span>
            </label>
            <button
              type="button"
              className="text-purple-600 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold p-3 rounded-lg transition-all duration-300"
          >
            Login
          </motion.button>

          {/* Social Login */}
          {/* <div className="mt-4 text-center text-gray-500 text-sm">or</div>
          <div className="mt-2 flex justify-center space-x-3">
            <button className="border p-2 rounded-full hover:bg-gray-50 transition">
              <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
            </button>
            <button className="border p-2 rounded-full hover:bg-gray-50 transition">
              <img src="/github-icon.svg" alt="GitHub" className="w-5 h-5" />
            </button>
          </div> */}

          {/* Register Link */}
          <p className="text-center text-gray-600 mt-6">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-purple-600 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </motion.form>
    </div>
  );
}
