import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function FacultyManagement() {
  const [faculties, setFaculties] = useState([]);
  const [newFaculty, setNewFaculty] = useState({
    name: "",
    email: "",
    id: "",
  });

  useEffect(() => {
    const savedFaculties = JSON.parse(localStorage.getItem("faculties")) || [];
    setFaculties(savedFaculties);
  }, []);

  const handleAddFaculty = () => {
    if (newFaculty.name && newFaculty.email && newFaculty.id) {

      if (faculties.some((f) => f.id === newFaculty.id)) {
        alert("Faculty ID already exists!");
        return;
      }

      const facultyWithPassword = {
        ...newFaculty,
        password: newFaculty.id,
      };
      const updatedFaculties = [...faculties, facultyWithPassword];
      setFaculties(updatedFaculties);
      localStorage.setItem("faculties", JSON.stringify(updatedFaculties));
      setNewFaculty({ name: "", email: "", id: "" });
      alert("Faculty added successfully!");
    } else {
      alert("Please fill in all the required fields.");
    }
  };

  const handleDeleteFaculty = (index) => {
    const updatedFaculties = faculties.filter((_, i) => i !== index);
    setFaculties(updatedFaculties);
    localStorage.setItem("faculties", JSON.stringify(updatedFaculties));
    alert("Faculty deleted successfully!");
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "20px",
          padding: "10px",
          borderBottom: "2px solid #ddd",
        }}
      >
        <input
          type="text"
          placeholder="Name"
          value={newFaculty.name}
          onChange={(e) => setNewFaculty({ ...newFaculty, name: e.target.value })}
          style={{ flex: 1, padding: "8px", borderRadius: "8px", border: "1px solid #ddd" }}
        />
        <input
          type="email"
          placeholder="Email"
          value={newFaculty.email}
          onChange={(e) => setNewFaculty({ ...newFaculty, email: e.target.value })}
          style={{ flex: 1, padding: "8px", borderRadius: "8px", border: "1px solid #ddd" }}
        />
        <input
          type="text"
          placeholder="Faculty ID"
          value={newFaculty.id}
          onChange={(e) => setNewFaculty({ ...newFaculty, id: e.target.value })}
          style={{ flex: 1, padding: "8px", borderRadius: "8px", border: "1px solid #ddd" }}
        />
        <button
          onClick={handleAddFaculty}
          style={{ padding: "10px 20px", backgroundColor: "#1b5e20", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}
        >
          Add
        </button>
      </div>
      <div>
        <h3>Existing Faculties</h3>
        {faculties.length > 0 ? (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {faculties.map((faculty, index) => (
              <li
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px 0",
                  borderBottom: "1px solid #ddd",
                }}
              >
                <span>
                  {faculty.name} ({faculty.id}) | {faculty.email}
                </span>
                <button
                  onClick={() => handleDeleteFaculty(index)}
                  style={{ padding: "5px 10px", backgroundColor: "#d32f2f", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No faculties added yet.</p>
        )}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("profile");

  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: "",
    regNo: "",
    dob: "",
    phone: "",
    email: "",
  });

  
  useEffect(() => {
    const savedStudents = JSON.parse(localStorage.getItem("students")) || [];
    setStudents(savedStudents);
  }, []);

  const handleAddStudent = () => {
    if (newStudent.name && newStudent.regNo && newStudent.dob) {
      
      const studentWithPassword = {
        ...newStudent,
        id: newStudent.regNo,
        password: newStudent.dob,
      };
      delete studentWithPassword.regNo; 

      const updatedStudents = [...students, studentWithPassword];
      setStudents(updatedStudents);
      localStorage.setItem("students", JSON.stringify(updatedStudents)); 
      setNewStudent({ name: "", regNo: "", dob: "", phone: "", email: "" });
      alert("Student added successfully!");
    } else {
      alert("Please fill in all the required fields including DOB.");
    }
  };


  const handleDeleteStudent = (index) => {
    const updatedStudents = students.filter((_, i) => i !== index);
    setStudents(updatedStudents);
    localStorage.setItem("students", JSON.stringify(updatedStudents)); 
    alert("Student deleted successfully!");
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Arial, sans-serif" }}>

      <aside
        style={{
          width: "250px",
          backgroundColor: "#1b5e20",
          color: "white",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          height: "100vh",
          boxSizing: "border-box",
          position: "relative",
        }}
      >
        <h2 style={{ marginBottom: "30px", textAlign: "center" }}>Admin Dashboard</h2>
        <button
          onClick={() => setActiveSection("profile")}
          style={{
            padding: "10px",
            backgroundColor: activeSection === "profile" ? "#388e3c" : "transparent",
            color: "white",
            border: "none",
            borderRadius: "8px",
            textAlign: "left",
            cursor: "pointer",
          }}
        >
          Admin Profile
        </button>
        <button
          onClick={() => setActiveSection("students")}
          style={{
            padding: "10px",
            backgroundColor: activeSection === "students" ? "#388e3c" : "transparent",
            color: "white",
            border: "none",
            borderRadius: "8px",
            textAlign: "left",
            cursor: "pointer",
          }}
        >
          Student Management
        </button>
        <button
          onClick={() => setActiveSection("faculties")}
          style={{
            padding: "10px",
            backgroundColor: activeSection === "faculties" ? "#388e3c" : "transparent",
            color: "white",
            border: "none",
            borderRadius: "8px",
            textAlign: "left",
            cursor: "pointer",
          }}
        >
          Faculty Management
        </button>
        <button
          onClick={() => setActiveSection("view")}
          style={{
            padding: "10px",
            backgroundColor: activeSection === "view" ? "#388e3c" : "transparent",
            color: "white",
            border: "none",
            borderRadius: "8px",
            textAlign: "left",
            cursor: "pointer",
          }}
        >
          View
        </button>
        <button
          onClick={() => setActiveSection("assignments")}
          style={{
            padding: "10px",
            backgroundColor: activeSection === "assignments" ? "#388e3c" : "transparent",
            color: "white",
            border: "none",
            borderRadius: "8px",
            textAlign: "left",
            cursor: "pointer",
          }}
        >
          Assign Subjects/Students
        </button>
        <button
          onClick={() => setActiveSection("messages")}
          style={{
            padding: "10px",
            backgroundColor: activeSection === "messages" ? "#388e3c" : "transparent",
            color: "white",
            border: "none",
            borderRadius: "8px",
            textAlign: "left",
            cursor: "pointer",
          }}
        >
          Messages
        </button>
        <div style={{ flex: 1 }} />
        <button
          onClick={handleLogout}
          style={{
            padding: "12px 0",
            backgroundColor: "#d32f2f",
            color: "white",
            border: "none",
            borderRadius: "8px",
            textAlign: "center",
            cursor: "pointer",
            marginTop: "auto",
            fontWeight: "bold",
            width: "100%",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            fontSize: "1rem",
            letterSpacing: "1px",
          }}
        >
          Logout
        </button>
      </aside>

      <main style={{ flex: 1, padding: "20px", backgroundColor: "#f4f4f4", overflowY: "auto" }}>

        {activeSection === "profile" && ( 
          <div
            style={{
              padding: "20px",
              backgroundColor: "white",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <h2 style={{ marginBottom: "20px", color: "#1b5e20" }}>Admin Profile</h2>
            <p><strong>Name:</strong> Mr. Shivaramkumar Ponnarangan</p>
            <p><strong>Role:</strong> University Admin</p>
            <p><strong>University:</strong> SRM University Sikkim</p>
            <p><strong>Gender:</strong> Male</p>
            <p><strong>Email:</strong> Shivaram@xyz.com</p>
            <p><strong>Phone:</strong> 0981234567</p>
          </div>
        )}

        {activeSection === "students" && (
          <div
            style={{
              padding: "20px",
              backgroundColor: "white",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <h2 style={{ marginBottom: "20px", color: "#1b5e20" }}>Student Management</h2>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "20px",
                padding: "10px",
                borderBottom: "2px solid #ddd",
              }}
            >
              <input
                type="text"
                placeholder="Name"
                value={newStudent.name}
                onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                style={{
                  flex: 1,
                  padding: "8px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                }}
              />
              <input
                type="text"
                placeholder="Reg No"
                value={newStudent.regNo}
                onChange={(e) => setNewStudent({ ...newStudent, regNo: e.target.value })}
                style={{
                  flex: 1,
                  padding: "8px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                }}
              />
              <input
                type="date"
                value={newStudent.dob}
                onChange={(e) => setNewStudent({ ...newStudent, dob: e.target.value })}
                style={{
                  flex: 1,
                  padding: "8px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                }}
              />
              <input
                type="text"
                placeholder="Phone"
                value={newStudent.phone}
                onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                style={{
                  flex: 1,
                  padding: "8px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                }}
              />
              <input
                type="email"
                placeholder="Email"
                value={newStudent.email}
                onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                style={{
                  flex: 1,
                  padding: "8px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                }}
              />
              <button
                onClick={handleAddStudent}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#1b5e20",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Add
              </button>
            </div>

            <div>
              <h3>Existing Students</h3>
              {students.length > 0 ? (
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {students.map((student, index) => (
                    <li
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "10px 0",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      <span>
                        {student.name} ({student.id}) | {student.phone} | {student.email}
                      </span>
                      <button
                        onClick={() => handleDeleteStudent(index)}
                        style={{
                          padding: "5px 10px",
                          backgroundColor: "#d32f2f",
                          color: "white",
                          border: "none",
                          borderRadius: "8px",
                          cursor: "pointer",
                        }}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No students added yet.</p>
              )}
            </div>
          </div>
        )}

        {activeSection === "faculties" && (
          <div
            style={{
              padding: "20px",
              backgroundColor: "white",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <h2 style={{ marginBottom: "20px", color: "#1b5e20" }}>Faculty Management</h2>

            <FacultyManagement />
          </div>
        )}

        {activeSection === "view" && (
          <div
            style={{
              padding: "20px",
              backgroundColor: "white",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <h2 style={{ marginBottom: "20px", color: "#1b5e20" }}>View Student/Faculty Profile</h2>
            <ViewProfile />
          </div>
        )}


        {activeSection === "assignments" && (
          <div
            style={{
              padding: "20px",
              backgroundColor: "white",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <h2 style={{ marginBottom: "20px", color: "#1b5e20" }}>Assign Subjects and Students to Faculty</h2>
            <AssignFacultySubjects />
          </div>
        )}


        {activeSection === "messages" && (
          <div
            style={{
              padding: "20px",
              backgroundColor: "white",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <h2 style={{ marginBottom: "20px", color: "#1b5e20" }}>Pending Registrations</h2>
            <MessagesSection />
          </div>
        )}
      </main>
    </div>
  );
}

function ViewProfile() {
  const [type, setType] = useState("student");
  const [id, setId] = useState("");
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = () => {
    setError("");
    setProfile(null);
    if (!id) {
      setError("Please enter an ID.");
      return;
    }
    if (type === "student") {
      const students = JSON.parse(localStorage.getItem("students")) || [];
      const found = students.find(s => s.id === id);
      if (found) setProfile(found);
      else setError("Student not found.");
    } else {
      const faculties = JSON.parse(localStorage.getItem("faculties")) || [];
      const found = faculties.find(f => f.id === id);
      if (found) setProfile(found);
      else setError("Faculty not found.");
    }
  };

  return (
    <div>
      <div style={{ display: "flex", gap: "10px", marginBottom: 20 }}>
        <select value={type} onChange={e => setType(e.target.value)} style={{ padding: 8, borderRadius: 8 }}>
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
        </select>
        <input
          type="text"
          placeholder={type === "student" ? "Enter Student ID" : "Enter Faculty ID"}
          value={id}
          onChange={e => setId(e.target.value)}
          style={{ padding: 8, borderRadius: 8, flex: 1 }}
        />
        <button onClick={handleSearch} style={{ padding: "8px 16px", backgroundColor: "#1b5e20", color: "white", border: "none", borderRadius: 8, cursor: "pointer" }}>
          View
        </button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {profile && (
        <div style={{ marginTop: 20, background: "#f9f9f9", padding: 20, borderRadius: 10 }}>
          <h3>Profile Details</h3>
          {type === "student" && profile.dob ? (
            <>
              <p><strong>Name:</strong> {profile.name}</p>
              <p><strong>Student ID:</strong> {profile.id}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Phone:</strong> {profile.phone}</p>
              <p><strong>Date of Birth:</strong> {profile.dob}</p>
            </>
          ) : type === "faculty" && !profile.dob ? (
            <>
              <p><strong>Name:</strong> {profile.name}</p>
              <p><strong>Faculty ID:</strong> {profile.id}</p>
              <p><strong>Email:</strong> {profile.email}</p>
            </>
          ) : (
            <p style={{ color: "red" }}>Profile data does not match the selected type.</p>
          )}
        </div>
      )}
    </div>
  );
}

function AssignFacultySubjects() {
  const [faculties, setFaculties] = useState([]);
  const [students, setStudents] = useState([]);
  const [facultyId, setFacultyId] = useState("");
  const [subject, setSubject] = useState("");
  const [studentIds, setStudentIds] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setFaculties(JSON.parse(localStorage.getItem("faculties")) || []);
    setStudents(JSON.parse(localStorage.getItem("students")) || []);
  }, []);

  const handleAssign = () => {
    if (!facultyId || !subject || studentIds.length === 0) {
      setMessage("Please select a faculty, subject, and at least one student.");
      return;
    }

    const assignments = JSON.parse(localStorage.getItem("facultyAssignments")) || [];
    const newAssignment = { facultyId, subject, studentIds };
    assignments.push(newAssignment);
    localStorage.setItem("facultyAssignments", JSON.stringify(assignments));
    setMessage("Assignment successful!");
    setFacultyId("");
    setSubject("");
    setStudentIds([]);
  };

  return (
    <div>
      <div style={{ display: "flex", gap: 10, marginBottom: 20, alignItems: "center" }}>
        <select value={facultyId} onChange={e => setFacultyId(e.target.value)} style={{ padding: 8, borderRadius: 8 }}>
          <option value="">Select Faculty</option>
          {faculties.map(f => (
            <option key={f.id} value={f.id}>{f.name} ({f.id})</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={e => setSubject(e.target.value)}
          style={{ padding: 8, borderRadius: 8 }}
        />
        <select
          multiple
          value={studentIds}
          onChange={e => setStudentIds(Array.from(e.target.selectedOptions, opt => opt.value))}
          style={{ padding: 8, borderRadius: 8, minWidth: 180, height: 80 }}
        >
          {students.map(s => (
            <option key={s.id} value={s.id}>{s.name} ({s.id})</option>
          ))}
        </select>
        <button onClick={handleAssign} style={{ padding: "8px 16px", backgroundColor: "#1b5e20", color: "white", border: "none", borderRadius: 8, cursor: "pointer" }}>
          Assign
        </button>
      </div>
      {message && <p style={{ color: message.includes("successful") ? "green" : "red" }}>{message}</p>}
      <div style={{ marginTop: 20 }}>
        <h3>Faculty-Student Assignments</h3>
        <FacultyStudentTable faculties={faculties} students={students} />
      </div>
    </div>
  );
}

function FacultyStudentTable({ faculties, students }) {
  const [assignments, setAssignments] = useState([]);
  useEffect(() => {
    const updateAssignments = () => {
      setAssignments(JSON.parse(localStorage.getItem("facultyAssignments")) || []);
    };
    updateAssignments();
    window.addEventListener("storage", updateAssignments);
    return () => window.removeEventListener("storage", updateAssignments);
  }, []);

  useEffect(() => {
    setAssignments(JSON.parse(localStorage.getItem("facultyAssignments")) || []);
  }, [faculties, students]);

  if (assignments.length === 0) return <p>No assignments yet.</p>;


  const studentMap = {};
  assignments.forEach((a, idx) => {
    a.studentIds.forEach(sid => {
      if (!studentMap[sid]) studentMap[sid] = [];
      studentMap[sid].push({ facultyId: a.facultyId, subject: a.subject, assignmentIndex: idx });
    });
  });

  const handleRemove = (assignmentIndex, studentId) => {
    let updatedAssignments = [...assignments];
 
    updatedAssignments[assignmentIndex].studentIds = updatedAssignments[assignmentIndex].studentIds.filter(sid => sid !== studentId);

    if (updatedAssignments[assignmentIndex].studentIds.length === 0) {
      updatedAssignments.splice(assignmentIndex, 1);
    }
    setAssignments(updatedAssignments);
    localStorage.setItem("facultyAssignments", JSON.stringify(updatedAssignments));
  };

  return (
    <table style={{ width: "100%", borderCollapse: "collapse", background: "#f9f9f9" }}>
      <thead>
        <tr>
          <th style={{ border: "1px solid #ddd", padding: 8 }}>Student Name</th>
          <th style={{ border: "1px solid #ddd", padding: 8 }}>Student ID</th>
          <th style={{ border: "1px solid #ddd", padding: 8 }}>Faculty Name</th>
          <th style={{ border: "1px solid #ddd", padding: 8 }}>Faculty ID</th>
          <th style={{ border: "1px solid #ddd", padding: 8 }}>Subject</th>
          <th style={{ border: "1px solid #ddd", padding: 8 }}>Action</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(studentMap).map(([sid, facultyArr], idx) => {
          const student = students.find(s => s.id === sid);
          return facultyArr.map((f, i) => {
            const faculty = faculties.find(fac => fac.id === f.facultyId);
            return (
              <tr key={sid + f.facultyId + f.subject}>
                {i === 0 ? (
                  <>
                    <td rowSpan={facultyArr.length} style={{ border: "1px solid #ddd", padding: 8 }}>{student ? student.name : sid}</td>
                    <td rowSpan={facultyArr.length} style={{ border: "1px solid #ddd", padding: 8 }}>{sid}</td>
                  </>
                ) : null}
                <td style={{ border: "1px solid #ddd", padding: 8 }}>{faculty ? faculty.name : f.facultyId}</td>
                <td style={{ border: "1px solid #ddd", padding: 8 }}>{f.facultyId}</td>
                <td style={{ border: "1px solid #ddd", padding: 8 }}>{f.subject}</td>
                <td style={{ border: "1px solid #ddd", padding: 8 }}>
                  <button onClick={() => handleRemove(f.assignmentIndex, sid)} style={{ background: "#d32f2f", color: "white", border: "none", borderRadius: 6, padding: "4px 10px", cursor: "pointer" }}>Remove</button>
                </td>
              </tr>
            );
          });
        })}
      </tbody>
    </table>
  );
}

function MessagesSection() {
  const [pending, setPending] = useState([]);
  useEffect(() => {
    setPending(JSON.parse(localStorage.getItem("pendingRegistrations")) || []);
    const handler = () => setPending(JSON.parse(localStorage.getItem("pendingRegistrations")) || []);
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const handleApprove = (idx) => {
    const reg = pending[idx];
    let approvedList = JSON.parse(localStorage.getItem(reg.type === "student" ? "students" : "faculties")) || [];
    approvedList.push(reg.data);
    localStorage.setItem(reg.type === "student" ? "students" : "faculties", JSON.stringify(approvedList));
    const updated = pending.filter((_, i) => i !== idx);
    setPending(updated);
    localStorage.setItem("pendingRegistrations", JSON.stringify(updated));
  };
  const handleReject = (idx) => {
    const updated = pending.filter((_, i) => i !== idx);
    setPending(updated);
    localStorage.setItem("pendingRegistrations", JSON.stringify(updated));
  };

  if (pending.length === 0) return <p>No pending registrations.</p>;
  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {pending.map((reg, idx) => (
        <li key={idx} style={{ borderBottom: "1px solid #ddd", padding: 12, marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>
            <b>{reg.type === "student" ? "Student" : "Faculty"}:</b> {reg.data.name || reg.data.fullName} ({reg.data.id}) | {reg.data.email}
          </span>
          <span>
            <button onClick={() => handleApprove(idx)} style={{ background: "#1b5e20", color: "white", border: "none", borderRadius: 6, padding: "6px 14px", marginRight: 8, cursor: "pointer" }}>Approve</button>
            <button onClick={() => handleReject(idx)} style={{ background: "#d32f2f", color: "white", border: "none", borderRadius: 6, padding: "6px 14px", cursor: "pointer" }}>Reject</button>
          </span>
        </li>
      ))}
    </ul>
  );
}
