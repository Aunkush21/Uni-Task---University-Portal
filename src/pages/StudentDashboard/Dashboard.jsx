import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const loggedInId = localStorage.getItem("loggedInStudentId");

    if (!loggedInId) {
      navigate("/login");
      return;
    }

    const students = JSON.parse(localStorage.getItem("students")) || [];
    const currentStudent = students.find((s) => s.id === loggedInId);

    if (!currentStudent) {
      navigate("/login");
      return;
    }

    setStudent(currentStudent);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInStudentId");
    navigate("/login");
  };

  if (!student) {
    return <p>Loading...</p>;
  }

  return (
    <div className="green" style={{ minHeight: "100vh", padding: 20 }}>
      <h2>Welcome, {student.fullName}</h2>

      <section style={{ marginTop: 30, background: "#fff", padding: 20, borderRadius: 12 }}>
        <h3>Your Profile</h3>
        <p><strong>ID:</strong> {student.id}</p>
        <p><strong>Full Name:</strong> {student.fullName}</p>
        <p><strong>Gender:</strong> {student.gender}</p>
        <p><strong>Department:</strong> {student.department}</p>
        <p><strong>Semester:</strong> {student.sem}</p>
        <p><strong>Year:</strong> {student.year}</p>
        <p><strong>Address:</strong> {student.address}</p>
        <p><strong>Date of Birth:</strong> {student.dob}</p>
        <p><strong>Phone:</strong> {student.phone}</p>
        <p><strong>Email:</strong> {student.email}</p>
      </section>

      <section style={{ marginTop: 30, background: "#fff", padding: 20, borderRadius: 12 }}>
        <h3>Courses Enrolled</h3>
        <p>(You can add course data here later)</p>
      </section>

      <section style={{ marginTop: 30, background: "#fff", padding: 20, borderRadius: 12 }}>
        <h3>Announcements</h3>
        <p>No new announcements.</p>
      </section>

      <button
        onClick={handleLogout}
        style={{
          marginTop: 40,
          padding: "12px 20px",
          backgroundColor: "#1b5e20",
          color: "white",
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
}
