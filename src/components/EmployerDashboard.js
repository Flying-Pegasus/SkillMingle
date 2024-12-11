import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FreelancerCard from './FreelancerCard';
import Search from './Search';
import Filter from './Filter';
import '../styles/EmployerDashboard.css';

function EmployerDashboard() {
  const { jobId } = useParams(); // Retrieve jobId from URL
  const [jobDetails, setJobDetails] = useState(null); // Store job details
  const [freelancers, setFreelancers] = useState([]);
  const [filteredFreelancers, setFilteredFreelancers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Job ID:", jobId);
  
    fetch(`http://127.0.0.1:5000/job_details/${jobId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Parse job details
      })
      .then((jobDetails) => {
        // Use the job details to fetch recommendations
        console.log("Job Details:", jobDetails);
  
        fetch("http://127.0.0.1:5000/recommend_freelancers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(jobDetails), // Use job details as payload
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json(); // Parse recommendations
          })
          .then((data) => {
            console.log("Recommendations:", data);
            setFreelancers(data); // Update state with recommendations
            setFilteredFreelancers(data); // Update filtered list
          })
          .catch((error) => {
            console.error("Error fetching freelancers:", error);
            setError(error.message);
          });
      })
      .catch((error) => {
        console.error("Error fetching job details:", error);
        setError(error.message);
      });
  }, [jobId]); // Dependency: jobId

  const handleSearch = (query) => {
    const filtered = freelancers.filter(freelancer =>
      freelancer.freelancer.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredFreelancers(filtered);
  };

  const handleFilter = (filters) => {
    const filtered = freelancers.filter(freelancer =>
      (!filters.skills || freelancer.freelancer.skills.toLowerCase().includes(filters.skills.toLowerCase())) &&
      (!filters.location || freelancer.freelancer.country.toLowerCase().includes(filters.location.toLowerCase())) &&
      (!filters.hourlyRate || freelancer.freelancer.hourlyRate <= parseFloat(filters.hourlyRate))
    );
    setFilteredFreelancers(filtered);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="employer-dashboard">
      <h1>Recommended Freelancers</h1>
      <Search onSearch={handleSearch} />
      <Filter onFilter={handleFilter} />
      <div className="freelancer-cards-container">
        {filteredFreelancers.map((recommendation) => (
          <FreelancerCard key={recommendation.freelancer.id} freelancer={recommendation.freelancer} score={recommendation.score} />
        ))}
      </div>
    </div>
  );
}

export default EmployerDashboard;