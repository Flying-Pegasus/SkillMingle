import React, { useState, useEffect } from 'react';
import JobCard from './JobCard';
import '../styles/FreelancerDashboard.css';

function FreelancerDashboard() {
  const [jobs, setJobs] = useState([]);
  const freelancerId = 4; // Example freelancer ID (this can later be dynamic)

  useEffect(() => {
    fetch("http://127.0.0.1:5000/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ freelancer_id: freelancerId }),
    })
      .then((response) => response.json())
      .then((data) => {
        const filteredJobs = data.filter((job) => job.score > 0); // Exclude 0 similarity scores
        setJobs(filteredJobs);
      })
      .catch((error) =>
        console.error("Error fetching recommendations:", error)
      );
  }, []);

  return (
    <div className="freelancer-dashboard">
      <h2>Recommended Jobs</h2>
      <div className="jobs-list">
        {jobs.map((job, index) => (
          <JobCard key={index} job={job} />
        ))}
      </div>
    </div>
  );
}

export default FreelancerDashboard;
