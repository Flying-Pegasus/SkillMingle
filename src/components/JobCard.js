import React from "react";
import "../styles/JobCard.css";

function JobCard({ job }) {
  return (
    <div className="job-card">
      <h3>{job.title}</h3>
      {job.skills_required && (
        <p>
          <strong>Required Skills:</strong> {job.skills_required.join(", ")}
        </p>
      )}
      {job.budget && (
        <p>
          <strong>Budget:</strong> {job.budget}
        </p>
      )}
      {job.score !== undefined && (
        <p>
          <strong>Recommendation Score:</strong> {(job.score)*100} %
        </p>
      )}
      <button className="apply-button">View Details</button>
    </div>
  );
}

export default JobCard;
