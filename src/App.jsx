import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";

import StudentLanding from "./pages/StudentDashboard/StudentLanding";
import Profile from "./pages/StudentDashboard/Profile";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import FacultyDashboard from "./pages/FacultyDashboard/FacultyDashboard";
import FacultyLogin from "./pages/FacultyLogin";
import FacultyRegister from "./pages/FacultyRegister";


function StudentProtectedRoute({ children }) {
  const loggedInStudent = localStorage.getItem("loggedInStudent");
  if (!loggedInStudent) {
    return <Navigate to="/login" />;
  }
  return children;
}


function FacultyProtectedRoute({ children }) {
  const loggedInFaculty = localStorage.getItem("loggedInFaculty");
  if (!loggedInFaculty) {
    return <Navigate to="/faculty/login" />;
  }
  return children;
}

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  function toggleTheme() {
    setDarkMode((prev) => !prev);
  }

  return (
    <div className={darkMode ? "dark green" : "green"}>
      <Router>
        <Routes>
          <Route path="/" element={<Landing toggleTheme={toggleTheme} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          
          <Route
            path="/student/dashboard"
            element={
              <StudentProtectedRoute>
                <StudentLanding />
              </StudentProtectedRoute>
            }
          />
          <Route
            path="/student/profile"
            element={
              <StudentProtectedRoute>
                <Profile />
              </StudentProtectedRoute>
            }
          />

          
          <Route path="/faculty-login" element={<FacultyLogin />} />
          <Route path="/faculty-register" element={<FacultyRegister />} />
          <Route
            path="/faculty/dashboard"
            element={
              <FacultyProtectedRoute>
                <FacultyDashboard />
              </FacultyProtectedRoute>
            }
          />

         
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

    
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}
