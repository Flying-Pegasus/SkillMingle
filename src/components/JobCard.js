import React from 'react';
import '../styles/JobCard.css';

function JobCard({ job }) {
  return (
    <div className="job-card">
      <h3>{job.title}</h3>
      <p><strong>Company:</strong> {job.company}</p>
      <p><strong>Description:</strong> {job.description}</p>
      <p><strong>Budget:</strong> {job.budget}</p>
      <p><strong>Deadline:</strong> {job.deadline}</p>
      <button className="apply-button">Apply Now</button>
    </div>
  );
}

export default JobCard;
