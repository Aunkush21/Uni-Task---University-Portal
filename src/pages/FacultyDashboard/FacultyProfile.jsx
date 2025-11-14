import React, { useEffect, useState } from 'react';

const FacultyProfile = () => {
  const [faculty, setFaculty] = useState(null);

  useEffect(() => {

    const stored = localStorage.getItem("loggedInFaculty");
    if (stored) {
      setFaculty(JSON.parse(stored));
    }
  }, []);

  if (!faculty) return <div>Loading profile...</div>;

  return (
    <div>
      <h3>Faculty Profile</h3>
      <p><strong>Name:</strong> {faculty.name}</p>
      <p><strong>Email:</strong> {faculty.email}</p>
      <p><strong>Faculty ID:</strong> {faculty.id}</p>
    </div>
  );
};

export default FacultyProfile;
