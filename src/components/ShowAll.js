import React, { useEffect, useState } from 'react';

function ShowAll() {
  const [freelancers, setFreelancers] = useState([]);
  const [showFreelancers, setShowFreelancers] = useState(false);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/freelancers')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setFreelancers(data);
        setShowFreelancers(true);
      })
      .catch((error) => {
        console.error('Error fetching freelancers:', error);
        alert('Error fetching freelancers. Please try again.');
      });
  },[]);

  return (
    <div className="employer-app">
      <h1>Employer Dashboard</h1>

      {/* Render freelancer cards */}
      {showFreelancers && (
        <div className="freelancer-cards-container">
          {freelancers.map((freelancer) => (
            <div className="freelancer-card" key={freelancer.id}>
              <h3>{freelancer.name}</h3>
              <p><strong>Title:</strong> {freelancer.title}</p>
              <p><strong>Skills:</strong> {freelancer.skills.join(', ')}</p>
              <p><strong>Hourly Rate:</strong> ${freelancer.hourlyRate}/hr</p>
              <p><strong>Job Success:</strong> {freelancer.jobSuccess}%</p>
              <p><strong>Country:</strong> {freelancer.country}</p>
              <p><strong>Total Jobs:</strong> {freelancer.totalJobs}</p>
              <p><strong>Total Hours Worked:</strong> {freelancer.totalHours}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ShowAll;
