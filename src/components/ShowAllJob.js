import React, { useEffect, useState } from 'react';

function ShowAllJob() {
  const [jobs, setJobs] = useState([]);
  const [showJobs, setShowJobs] = useState(false);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/jobs')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setJobs(data);
        setShowJobs(true);
      })
      .catch((error) => {
        console.error('Error fetching jobs:', error);
        alert('Error fetching jobs. Please try again.');
      });
  },[]);

  return (
    <div className="freelancer-app">
      <h1>Freelancer Dashboard</h1>
      
      {/* Render jobs cards */}
      {showJobs && (
        <div className="freelancer-cards-container">
          {jobs.map((job) => (
            <div className="freelancer-card" key={job.id}>
              <h3>{job.jobTitle}</h3>
            <p><strong>Experience Level:</strong> {job.exLevelDemand}</p>
            <p><strong>Location:</strong> {job.clientCountry}</p>
            <p><strong>Rating:</strong> {job.rating}/5</p>
            <p><strong>Number of feedbacks:</strong> {job.feedbackNum}</p>
            <p><strong>Payment Type:</strong> {job.paymentType}</p>
            <p><strong>Budget:</strong> ${job.startRate}-${job.endRate}</p>
            <p><strong>Skills:</strong> {job.skills.join(', ')}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ShowAllJob;
