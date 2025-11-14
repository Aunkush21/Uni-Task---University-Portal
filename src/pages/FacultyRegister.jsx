import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FacultyRegister = () => {
  const [facultyId, setFacultyId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");
    if (!facultyId || !name || !email || !password) {
      setError("All fields are required");
      return;
    }

    const faculties = JSON.parse(localStorage.getItem("faculties")) || [];
    const pending = JSON.parse(localStorage.getItem("pendingRegistrations")) || [];
    if (faculties.find(f => f.id === facultyId) || pending.find(p => p.data.id === facultyId)) {
      setError("Faculty ID already exists or is pending approval");
      return;
    }
    const newFaculty = { id: facultyId, name, email, password };
    pending.push({ type: "faculty", data: newFaculty });
    localStorage.setItem("pendingRegistrations", JSON.stringify(pending));
    alert("Registration submitted! Awaiting admin approval.");
    window.location.href = "/login?role=faculty";
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto", background: "white", padding: 30, borderRadius: 12, boxShadow: "0 6px 18px rgba(0,0,0,0.1)", border: "none" }}>
      <h2 style={{ textAlign: "center" }}>Faculty Register</h2>
      <form onSubmit={handleRegister}>
        <label>Faculty ID:</label>
        <input type="text" value={facultyId} onChange={e => setFacultyId(e.target.value)} required style={{ width: "100%", padding: 8, marginBottom: 12 }} />
        <label>Name:</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} required style={{ width: "100%", padding: 8, marginBottom: 12 }} />
        <label>Email:</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: "100%", padding: 8, marginBottom: 12 }} />
        <label>Password:</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: "100%", padding: 8, marginBottom: 12 }} />
        {error && <p style={{ color: "red", marginBottom: 12 }}>{error}</p>}
        <button type="submit" style={{ width: "100%", padding: 12, backgroundColor: "#1b5e20", color: "white", border: "none", borderRadius: 8, cursor: "pointer" }}>Register</button>
      </form>
      <p style={{ textAlign: "center", marginTop: 16 }}>
        Already have an account? <a href="/faculty-login" style={{ color: "#1b5e20", fontWeight: "bold" }}>Login here</a>
      </p>
    </div>
  );
};

export default FacultyRegister;
