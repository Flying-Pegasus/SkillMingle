import React, { useState, useEffect } from 'react';
import FreelancerCard from './FreelancerCard';
import '../styles/EmployerDashboard.css';

function EmployerDashboard() {
  const [freelancers, setFreelancers] = useState([]);
  const jobId = 1; // Example job ID (dynamic in a real app)

  useEffect(() => {
    fetch("http://127.0.0.1:5000/recommend_freelancers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ job_id: jobId }),
    })
      .then((response) => response.json())
      .then((data) => {
        const filteredFreelancers = data.filter((freelancer) => freelancer.score > 0);
        setFreelancers(filteredFreelancers);
      })
      .catch((error) => console.error("Error fetching recommendations:", error));
  }, []);

  return (
    <div className="employer-dashboard">
      <h2>Recommended Freelancers</h2>
      <div className="freelancers-list">
        {freelancers.length > 0 ? (
          freelancers.map((freelancer, index) => (
            <FreelancerCard key={index} freelancer={freelancer} />
          ))
          
        ) : (
          <p>No matching freelancers found.</p>
        )
        
        }
      </div>
    </div>
  );
}

export default EmployerDashboard;
