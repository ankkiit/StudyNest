import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Lessons from "./pages/Lessons";
import Quizzes from "./pages/Quizzes";
import AttemptQuiz from "./pages/AttemptQuiz";
import AddQuestion from "./pages/AddQuestions";
import MySubmissions from "./pages/MySubmissions";
import TeacherDashboard from "./pages/TeacherDashboard";
import MyCourses from "./pages/MyCourses";
import EnrolledStudents from "./pages/EnrolledStudents";
import AllCourses from "./pages/AllCourses";
import CourseAnalytics from "./pages/CourseAnalytics";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import ProtectedRoute from "./ProtectedRoute";
import './index.css';

// to handle hiding header/footer
function Layout({ children }) {
  const location = useLocation();
  const hideHeaderFooter =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <main className="min-h-screen bg-gray-50 p-4">{children}</main>
      {!hideHeaderFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:courseId/lessons" element={<Lessons />} />
          <Route path="/courses/:courseId/quizzes" element={<Quizzes />} />
          <Route path="/courses/:courseId/quizzes/:quizId/attempt" element={<AttemptQuiz />} />
          <Route path="/courses/:courseId/quizzes/:quizId/add-question" element={<AddQuestion />} />
          <Route path="/submissions" element={<MySubmissions />} />
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
          <Route path="/my-courses" element={<MyCourses />} />
          <Route path="/courses/:courseId/students" element={<EnrolledStudents />} />
          <Route path="/courses-All" element={<AllCourses />} />
          <Route path="/teacher/course/:courseId/analytics" element={<CourseAnalytics />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
