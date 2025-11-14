import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FacultyProfile from "./FacultyProfile";

export default function FacultyDashboard() {
  const [activeSection, setActiveSection] = useState("profile");
  const navigate = useNavigate();


  const handleLogout = () => {
    localStorage.removeItem("loggedInFaculty");
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
          justifyContent: "space-between",
        }}
      >
        <div>
          <h2 style={{ marginBottom: "30px", textAlign: "center" }}>Faculty Dashboard</h2>
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
              width: "100%",
            }}
          >
            Profile
          </button>
        </div>
        <button
          onClick={handleLogout}
          style={{
            padding: "10px",
            backgroundColor: "#d32f2f",
            color: "white",
            border: "none",
            borderRadius: "8px",
            textAlign: "left",
            cursor: "pointer",
            width: "100%",
            marginTop: "auto",
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
            <FacultyProfile />
          </div>
        )}
      </main>
    </div>
  );
}
