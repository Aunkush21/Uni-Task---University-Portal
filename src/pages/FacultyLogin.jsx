import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FacultyLogin = () => {
  const [facultyId, setFacultyId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const faculties = JSON.parse(localStorage.getItem("faculties")) || [];
    const user = faculties.find(f => f.id === facultyId && f.password === password);
    if (user) {
      localStorage.setItem("loggedInFaculty", JSON.stringify(user));
      alert("Faculty login successful!");
      navigate("/faculty/dashboard");
    } else {
      setError("Invalid faculty credentials or not approved yet");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto", background: "white", padding: 30, borderRadius: 12, boxShadow: "0 6px 18px rgba(0,0,0,0.1)" }}>
      <h2 style={{ textAlign: "center" }}>Faculty Login</h2>
      <form onSubmit={handleLogin}>
        <label>Faculty ID:</label>
        <input type="text" value={facultyId} onChange={e => setFacultyId(e.target.value)} required style={{ width: "100%", padding: 8, marginBottom: 12 }} />
        <label>Password:</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: "100%", padding: 8, marginBottom: 12 }} />
        {error && <p style={{ color: "red", marginBottom: 12 }}>{error}</p>}
        <button type="submit" style={{ width: "100%", padding: 12, backgroundColor: "#1b5e20", color: "white", border: "none", borderRadius: 8, cursor: "pointer" }}>Login</button>
      </form>
      <p style={{ textAlign: "center", marginTop: 16 }}>
        Don't have an account? <a href="/faculty-register" style={{ color: "#1b5e20", fontWeight: "bold" }}>Register here</a>
      </p>
    </div>
  );
};

export default FacultyLogin;
