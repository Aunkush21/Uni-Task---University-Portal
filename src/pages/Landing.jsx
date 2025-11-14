import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/srm-logo.png";
import "../App.css";

export default function Landing({ toggleTheme }) {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", background: "#eef9ef", margin: 0, padding: 0 }}>
      <div className="landing-container" style={{ border: "none", boxShadow: "none", background: "none", margin: 0, padding: 0 }}>

        <div className="header-row" style={{ background: "none", border: "none", boxShadow: "none", margin: 0, padding: 0 }}>
          <img src={logo} alt="SRM Logo" className="logo-top" />
        </div>


        <h1 className="center-title">SRM UNIVERSITY SIKKIM</h1>


        <nav className="navbar">
          <a href="#">Home</a>
          <a href="#">About Us</a>
          <a href="#">Contact</a>
        </nav>


        <div className="description">
          <h2>Welcome to the Official Portal</h2>
          <p>
            SRM University Sikkim provides digital access for students, parents, and admin.
            Please use the appropriate portal below to proceed.
          </p>
        </div>


        <div className="portal-cards">
          <div
            className="portal-card admin"
            onClick={() => navigate("/login?role=admin")}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && navigate("/login?role=admin")}
          >
            <h3>Admin Portal</h3>
            <p>Admins can log in to manage student records and academic data.</p>
          </div>

          <div
            className="portal-card student"
            onClick={() => navigate("/login?role=student")}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && navigate("/login?role=student")}
          >
            <h3>Student Portal</h3>
            <p>Students can register or log in to access their academic profile.</p>
          </div>

          <div
            className="portal-card faculty"
            style={{ boxShadow: '0 4px 12px 0 rgba(0, 128, 0, 0.15)', borderLeft: '4px solid #2e8b57' }}
            onClick={() => navigate("/faculty-login")}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && navigate("/faculty-login")}
          >
            <h3>Faculty Portal</h3>
            <p>Faculty can register or log in to access their dashboard and profile.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
