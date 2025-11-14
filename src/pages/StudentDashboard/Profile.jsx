import React, { useState } from "react";

export default function Profile() {
  const [activeSection, setActiveSection] = useState("profile");
  const loggedInStudent = JSON.parse(localStorage.getItem("loggedInStudent"));

  const attendanceData = [
    { subject: "English", attended: 20, total: 25 },
    { subject: "DAA", attended: 22, total: 25 },
    { subject: "React JS", attended: 24, total: 25 },
    { subject: "Software Engineering", attended: 23, total: 25 },
    { subject: "DCN", attended: 21, total: 25 },
    { subject: "MP/MC", attended: 19, total: 25 },
  ];

  const examMarks = [
    { subject: "English", marks: 98 },
    { subject: "DAA", marks: 99 },
    { subject: "React JS", marks: 97.5 },
    { subject: "Software Engineering", marks: 98.5 },
    { subject: "DCN", marks: 99.2 },
    { subject: "MP/MC", marks: 97.8 },
  ];

  const timetable = [
    ["9:30-10:20", "English", "DCN", "MP/MC", "DAA", "DAA"],
    ["10:20-11:10", "English", "DAA", "React JS", "Software Engineering", "React JS"],
    ["11:20-12:10", "DAA", "React JS", "Software Engineering", "DCN", "MP/MC"],
    ["12:10-1:00", "DAA", "React JS", "Software Engineering", "DCN", "MP/MC"],
    ["2:00-2:50", "Seminar", "Software Engineering", "MP/MC", "React JS", "Software Engineering"],
    ["2:50-3:40", "Seminar", "English", "React JS", "MP/MC", "DCN"],
  ];

  const handleLogout = () => {
    localStorage.removeItem("loggedInStudent");
    window.location.href = "/login";
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f7f6",
        display: "flex",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        flexWrap: "wrap", 
      }}
    >
      {}
      <nav
        style={{
          flex: "1 1 250px", 
          maxWidth: "300px",
          backgroundColor: "#1b5e20",
          color: "#cfd8dc",
          padding: "30px 20px",
          display: "flex",
          flexDirection: "column",
          borderTopRightRadius: "10px",
          borderBottomRightRadius: "10px",
          boxShadow: "2px 0 8px rgba(0,0,0,0.1)",
          minWidth: "220px",
          boxSizing: "border-box",
        }}
      >
        <h2
          style={{
            marginBottom: "30px",
            fontWeight: "700",
            fontSize: "1.5rem",
            letterSpacing: "1px",
            color: "#e8f5e9",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          title="Student Dashboard"
        >
          Student Dashboard
        </h2>

        {["profile", "timetable", "attendance", "examMarks"].map((section) => (
          <div
            key={section}
            onClick={() => setActiveSection(section)}
            style={{
              padding: "12px 16px",
              marginBottom: "12px",
              borderRadius: "8px",
              cursor: "pointer",
              backgroundColor: activeSection === section ? "#388e3c" : "transparent",
              fontWeight: activeSection === section ? "600" : "400",
              color: activeSection === section ? "#e8f5e9" : "#cfd8dc",
              transition: "background-color 0.3s",
              userSelect: "none",
              fontSize: "1.05rem",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            title={
              section === "profile"
                ? "Student Profile"
                : section.charAt(0).toUpperCase() + section.slice(1)
            }
          >
            {section === "profile" && "Student Profile"}
            {section === "timetable" && "Timetable"}
            {section === "attendance" && "Attendance"}
            {section === "examMarks" && "Exam Marks"}
          </div>
        ))}

        <button
          onClick={handleLogout}
          style={{
            marginTop: "auto",
            padding: "12px 0",
            backgroundColor: "#e8f5e9",
            color: "#2e3a46",
            border: "none",
            borderRadius: "8px",
            fontWeight: "700",
            cursor: "pointer",
            boxShadow: "0 3px 6px rgba(46,58,70,0.3)",
            transition: "background-color 0.3s",
            fontSize: "1rem",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#c8e6c9")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#e8f5e9")}
        >
          Logout
        </button>
      </nav>

      {}
      <main
        style={{
          flex: "3 1 600px",
          padding: "30px",
          backgroundColor: "#ffffff",
          margin: "20px",
          borderRadius: "12px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          minHeight: "calc(100vh - 40px)",
          overflowY: "auto",
          boxSizing: "border-box",
          maxWidth: "calc(100% - 280px - 40px)", 
        }}
      >
        {}

        {activeSection === "profile" && (
          <section
            style={{
              backgroundColor: "#e8f5e9",
              padding: "25px 30px",
              borderRadius: "10px",
              border: "1.5px solid #a6c9a0",
              color: "#2f4f4f",
              maxWidth: "600px",
              lineHeight: "1.6",
              fontSize: "1rem",
            }}
          >
            <h2 style={{ marginBottom: "18px", fontWeight: "700" }}>Student Profile</h2>
            <p><strong>Name:</strong> {loggedInStudent?.name || "N/A"}</p>
            <p><strong>Email:</strong> {loggedInStudent?.email || "N/A"}</p>
            <p><strong>Phone Number:</strong> {loggedInStudent?.phone || "N/A"}</p>
            <p><strong>Date of Birth:</strong> {loggedInStudent?.dob || "N/A"}</p>
          </section>
        )}

        {activeSection === "timetable" && (
          <section
            style={{
              backgroundColor: "#e8f5e9",
              padding: "25px",
              borderRadius: "10px",
              border: "1.5px solid #a6c9a0",
              color: "#2f4f4f",
              overflowX: "auto",
              fontSize: "0.95rem",
            }}
          >
            <h2 style={{ marginBottom: "20px", fontWeight: "700" }}>Timetable</h2>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                minWidth: "600px",
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      borderBottom: "2px solid #a6c9a0",
                      padding: "12px",
                      textAlign: "left",
                      fontWeight: "600",
                    }}
                  >
                    Time
                  </th>
                  {["Day1", "Day2", "Day3", "Day4", "Day5"].map((day) => (
                    <th
                      key={day}
                      style={{
                        borderBottom: "2px solid #a6c9a0",
                        padding: "12px",
                        textAlign: "left",
                        fontWeight: "600",
                      }}
                    >
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timetable.map(([time, ...subjects], idx) => (
                  <tr
                    key={idx}
                    style={{
                      backgroundColor: idx % 2 === 0 ? "#dcedc8" : "transparent",
                    }}
                  >
                    <td style={{ padding: "10px", borderBottom: "1px solid #a6c9a0" }}>
                      {time}
                    </td>
                    {subjects.map((subj, i) => (
                      <td
                        key={i}
                        style={{
                          padding: "10px",
                          borderBottom: "1px solid #a6c9a0",
                          fontWeight: "600",
                        }}
                      >
                        {subj}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {activeSection === "attendance" && (
          <section
            style={{
              backgroundColor: "#e8f5e9",
              padding: "25px",
              borderRadius: "10px",
              border: "1.5px solid #a6c9a0",
              color: "#2f4f4f",
              maxWidth: "600px",
              fontSize: "1rem",
            }}
          >
            <h2 style={{ marginBottom: "20px", fontWeight: "700" }}>Attendance</h2>
            <ul style={{ paddingLeft: "20px", lineHeight: "1.6" }}>
              {attendanceData.map(({ subject, attended, total }) => {
                const percentage = ((attended / total) * 100).toFixed(1);
                return (
                  <li
                    key={subject}
                    style={{
                      marginBottom: "12px",
                      fontWeight: "600",
                    }}
                  >
                    {subject}: {attended} / {total} ({percentage}%)
                    <div
                      style={{
                        height: "8px",
                        width: "100%",
                        backgroundColor: "#c8e6c9",
                        borderRadius: "4px",
                        marginTop: "6px",
                      }}
                    >
                      <div
                        style={{
                          width: `${percentage}%`,
                          height: "100%",
                          backgroundColor: "#4caf50",
                          borderRadius: "4px",
                        }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        {activeSection === "examMarks" && (
          <section
            style={{
              backgroundColor: "#e8f5e9",
              padding: "25px",
              borderRadius: "10px",
              border: "1.5px solid #a6c9a0",
              color: "#2f4f4f",
              maxWidth: "600px",
              fontSize: "1rem",
            }}
          >
            <h2 style={{ marginBottom: "20px", fontWeight: "700" }}>Exam Marks</h2>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      borderBottom: "2px solid #a6c9a0",
                      padding: "12px",
                      textAlign: "left",
                      fontWeight: "600",
                    }}
                  >
                    Subject
                  </th>
                  <th
                    style={{
                      borderBottom: "2px solid #a6c9a0",
                      padding: "12px",
                      textAlign: "left",
                      fontWeight: "600",
                    }}
                  >
                    Marks (%)
                  </th>
                </tr>
              </thead>
              <tbody>
                {examMarks.map(({ subject, marks }) => (
                  <tr key={subject}>
                    <td
                      style={{
                        borderBottom: "1px solid #a6c9a0",
                        padding: "10px",
                      }}
                    >
                      {subject}
                    </td>
                    <td
                      style={{
                        borderBottom: "1px solid #a6c9a0",
                        padding: "10px",
                        fontWeight: "600",
                        color: marks >= 97 ? "#388e3c" : "inherit",
                      }}
                    >
                      {marks}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
      </main>
    </div>
  );
}
