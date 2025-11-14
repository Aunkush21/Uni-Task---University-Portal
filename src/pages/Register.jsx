import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: "", 
    name: "",
    dob: "",
    phone: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((fd) => ({ ...fd, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");


    const students = JSON.parse(localStorage.getItem("students")) || [];
    const pending = JSON.parse(localStorage.getItem("pendingRegistrations")) || [];
    if (students.find((s) => s.id === formData.id) || pending.find((p) => p.data.id === formData.id)) {
      setError("Student ID already exists or is pending approval");
      return;
    }

    pending.push({ type: "student", data: formData });
    localStorage.setItem("pendingRegistrations", JSON.stringify(pending));
    alert("Registration submitted! Awaiting admin approval.");
    navigate("/login?role=student");
  };

  return (
    <div style={{ minHeight: "100vh", padding: "30px 20px", background: "#f4f4f9" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>Student Registration</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: 600,
          margin: "0 auto",
          background: "white",
          padding: 30,
          borderRadius: 12,
          boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
        }}
      >
        <label>Student ID:</label>
        <input
          name="id"
          value={formData.id}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: 8, marginBottom: 12 }}
        />

        <label>Name:</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: 8, marginBottom: 12 }}
        />

        <label>Date of Birth:</label>
        <input
          name="dob"
          type="date"
          value={formData.dob}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: 8, marginBottom: 12 }}
        />

        <label>Phone Number:</label>
        <input
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: 8, marginBottom: 12 }}
        />

        <label>Email:</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: 8, marginBottom: 12 }}
        />

        <label>Password:</label>
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: 8, marginBottom: 20 }}
        />

        {error && <p style={{ color: "red", marginBottom: 20 }}>{error}</p>}

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
          Register
        </button>
      </form>
    </div>
  );
}
