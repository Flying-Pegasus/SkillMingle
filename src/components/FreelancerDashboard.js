import React, { useState, useEffect } from "react";
import JobCard from "./JobCard";
import { useLocation } from "react-router-dom"; // Import useLocation to access query parameters
import "../styles/FreelancerDashboard.css";

function FreelancerDashboard() {
  const [jobs, setJobs] = useState([]);
  const location = useLocation(); // Get current route information
  const queryParams = new URLSearchParams(location.search);
  const freelancerId = queryParams.get("freelancerId"); // Extract freelancerId from query parameters

  useEffect(() => {
    if (!freelancerId) return; // Skip API call if freelancerId is not present

    fetch("http://127.0.0.1:5000/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ freelancer_id: freelancerId }),
    })
      .then((response) => response.json())
      .then((data) => {
        const filteredJobs = data.filter((job) => job.score > 0); // Exclude jobs with 0 similarity score
        setJobs(filteredJobs);
      })
      .catch((error) =>
        console.error("Error fetching recommendations:", error)
      );
  }, [freelancerId]); // Rerun the effect whenever freelancerId changes

  return (
    <div className="freelancer-dashboard">
      <h2>Recommended Jobs</h2>
      <div className="jobs-list">
        {jobs.length > 0 ? (
          jobs.map((job, index) => <JobCard key={index} job={job} />)
        ) : (
          <p>No matching jobs found.</p>
        )}
      </div>
    </div>
  );
}

export default FreelancerDashboard;
