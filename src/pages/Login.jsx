import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();


  const [activePortal, setActivePortal] = useState("student"); 
  const [adminId, setAdminId] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminError, setAdminError] = useState("");

  const [studentId, setStudentId] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [studentError, setStudentError] = useState("");


  const [facultyId, setFacultyId] = useState("");
  const [facultyPassword, setFacultyPassword] = useState("");
  const [facultyError, setFacultyError] = useState("");


  const handleAdminLogin = (e) => {
    e.preventDefault();
    setAdminError("");
    if (adminId === "admin2004" && adminPassword === "admin2004") {
      alert("Admin login successful!");

      navigate("/admin/dashboard");
    } else {
      setAdminError("Invalid admin credentials");
    }
  };

  const handleStudentLogin = (e) => {
    e.preventDefault();
    setStudentError("");
    const students = JSON.parse(localStorage.getItem("students")) || [];

    const user = students.find(
      (s) => s.id === studentId && s.password === studentPassword
    );
    if (user) {
      localStorage.setItem("loggedInStudent", JSON.stringify(user))
      alert("Student login successful!");

      navigate("/student/profile");
    } else {
      setStudentError("Invalid student credentials or not approved yet");
    }
  };


  const handleFacultyLogin = (e) => {
    e.preventDefault();
    setFacultyError("");

    const faculties = JSON.parse(localStorage.getItem("faculties")) || [];
    const user = faculties.find(
      (f) => f.id === facultyId && f.password === facultyPassword
    );
    if (user) {
      localStorage.setItem("loggedInFaculty", JSON.stringify(user));
      alert("Faculty login successful!");
      navigate("/faculty/dashboard");
    } else {
      setFacultyError("Invalid faculty credentials or not approved yet");
    }
  };

  return (
    <div className="green" style={{ minHeight: "100vh", padding: 20 }}>

      <div style={{ display: "flex", justifyContent: "center", gap: 30, marginBottom: 30 }}>
        {["student", "admin", "faculty"].map((portal) => (
          <button
            key={portal}
            onClick={() => setActivePortal(portal)}
            style={{
              padding: "10px 25px",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              backgroundColor: activePortal === portal ? "#1b5e20" : "#ddd",
              color: activePortal === portal ? "white" : "black",
              fontWeight: activePortal === portal ? "bold" : "normal",
              textTransform: "capitalize",
            }}
          >
            {portal.charAt(0).toUpperCase() + portal.slice(1)}
          </button>
        ))}
      </div>

      {activePortal === "admin" && (
        <div
          style={{
            background: "white",
            padding: 30,
            borderRadius: 12,
            maxWidth: 400,
            margin: "auto",
            boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ textAlign: "center" }}>Admin Login</h2>
          <form onSubmit={handleAdminLogin}>
            <label>Admin ID:</label>
            <input
              type="text"
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
              required
              style={{ width: "100%", padding: 8, marginBottom: 12 }}
            />
            <label>Password:</label>
            <input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              required
              style={{ width: "100%", padding: 8, marginBottom: 12 }}
            />
            {adminError && (
              <p style={{ color: "red", marginBottom: 12 }}>{adminError}</p>
            )}
            <button
              type="submit"
              style={{
                width: "100%",
                padding: 12,
                backgroundColor: "#1b5e20",
                color: "white",
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              Login as Admin
            </button>
          </form>
        </div>
      )}

      {activePortal === "student" && (
        <div
          style={{
            background: "white",
            padding: 30,
            borderRadius: 12,
            maxWidth: 400,
            margin: "auto",
            boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ textAlign: "center" }}>Student Login</h2>
          <form onSubmit={handleStudentLogin}>
            <label>Student ID:</label>
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              required
              style={{ width: "100%", padding: 8, marginBottom: 12 }}
            />
            <label>Password:</label>
            <input
              type="password"
              value={studentPassword}
              onChange={(e) => setStudentPassword(e.target.value)}
              required
              style={{ width: "100%", padding: 8, marginBottom: 12 }}
            />
            {studentError && (
              <p style={{ color: "red", marginBottom: 12 }}>{studentError}</p>
            )}
            <button
              type="submit"
              style={{
                width: "100%",
                padding: 12,
                backgroundColor: "#1b5e20",
                color: "white",
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
                marginBottom: 10,
              }}
            >
              Login as Student
            </button>
          </form>
          <p style={{ textAlign: "center" }}>
            Don't have an account?{" "}
            <a
              href="/register"
              style={{ color: "#1b5e20", fontWeight: "bold", cursor: "pointer" }}
            >
              Register here
            </a>
          </p>
        </div>
      )}

      {activePortal === "faculty" && (
        <div
          style={{
            background: "white",
            padding: 30,
            borderRadius: 12,
            maxWidth: 400,
            margin: "auto",
            boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ textAlign: "center" }}>Faculty Login</h2>
          <form onSubmit={handleFacultyLogin}>
            <label>Faculty ID:</label>
            <input
              type="text"
              value={facultyId}
              onChange={(e) => setFacultyId(e.target.value)}
              required
              style={{ width: "100%", padding: 8, marginBottom: 12 }}
            />
            <label>Password:</label>
            <input
              type="password"
              value={facultyPassword}
              onChange={(e) => setFacultyPassword(e.target.value)}
              required
              style={{ width: "100%", padding: 8, marginBottom: 12 }}
            />
            {facultyError && (
              <p style={{ color: "red", marginBottom: 12 }}>{facultyError}</p>
            )}
            <button
              type="submit"
              style={{
                width: "100%",
                padding: 12,
                backgroundColor: "#1b5e20",
                color: "white",
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              Login as Faculty
            </button>
          </form>
          <p style={{ textAlign: "center" }}>
            Don't have an account?{" "}
            <a
              href="/faculty-register"
              style={{ color: "#1b5e20", fontWeight: "bold", cursor: "pointer" }}
            >
              Register here
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
