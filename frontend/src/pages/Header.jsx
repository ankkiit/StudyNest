import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    alert("Logged out successfully!");
    navigate("/login");
  };

  return (
    <header className="bg-blue-700 text-white p-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-2xl font-bold hover:text-gray-200">
        MyLMS
      </Link>

      <nav className="flex items-center space-x-6">
        {/* Student Section */}
        {role === "STUDENT" && (
          <>
            <Link to="/dashboard" className="hover:text-gray-200">
              Dashboard
            </Link>
            <Link to="/courses" className="hover:text-gray-200">
              Courses
            </Link>
            <Link to="/submissions" className="hover:text-gray-200">
              My Submissions
            </Link>
          </>
        )}

        {/* Teacher Section */}
        {role === "TEACHER" && (
          <>
            <Link to="/teacher/dashboard" className="hover:text-gray-200">
              Dashboard
            </Link>
            <Link to="/my-courses" className="hover:text-gray-200">
              My Courses
            </Link>
            <Link to="/courses-All" className="hover:text-gray-200">
              All Courses
            </Link>
          </>
        )}


        {/* Common for all logged-in users */}
        {username && (
          <span className="italic text-sm font-semibold">
            Hi, {username}
          </span>
        )}

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
        >
          Logout
        </button>
      </nav>
    </header>
  );
}
