import React, { useState, useEffect } from 'react';
import JobCard from './JobCard';
import '../styles/FreelancerDashboard.css';
import employersDetails from './ExampleEmployers'

function FreelancerDashboard() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Fetch job data from the JSON file
    fetch('./exampleEmployers.json')
      .then(response => response.json())
      .then(data => setJobs(data));
  }, []);

  return (
    <div className="freelancer-dashboard">
      <h2>Recommended Jobs</h2>
      <div className="jobs-list">
        {employersDetails.map(job => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}

export default FreelancerDashboard;
