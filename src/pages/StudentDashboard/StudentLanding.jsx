import React from "react";
import { useNavigate } from "react-router-dom";

export default function StudentLanding() {
  const navigate = useNavigate();
  const studentId = localStorage.getItem("loggedInStudent");

  if (!studentId) {
    navigate("/login");
    return null;
  }

  function handleLogout() {
    localStorage.removeItem("loggedInStudent");
    navigate("/login");
  }

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: 20, textAlign: "center" }}>
      <h1>Welcome to SRM UNIVERSITY SIKKIM</h1>
      <h2>Hello, {studentId}!</h2>

      <p>What would you like to do today?</p>

      <div style={{ margin: "30px 0" }}>
        <button
          onClick={() => navigate("/student/profile")}
          style={{ marginRight: 15, padding: "10px 20px", fontSize: 16 }}
        >
          View Profile
        </button>

        <button
          onClick={() => alert("Courses page coming soon!")}
          style={{ marginRight: 15, padding: "10px 20px", fontSize: 16 }}
        >
          Courses
        </button>

        <button
          onClick={() => alert("Grades page coming soon!")}
          style={{ padding: "10px 20px", fontSize: 16 }}
        >
          Grades
        </button>
      </div>

      <button
        onClick={handleLogout}
        style={{
          marginTop: 40,
          padding: "10px 30px",
          backgroundColor: "#b71c1c",
          color: "white",
          border: "none",
          borderRadius: 5,
          cursor: "pointer",
          fontSize: 16,
        }}
      >
        Logout
      </button>
    </div>
  );
}
