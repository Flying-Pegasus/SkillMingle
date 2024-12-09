import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import JobCard from './JobCard';
import Search from './Search';
import Filter from './Filter';
import '../styles/FreelancerDashboard.css';

function FreelancerDashboard() {
  const { freelancerId } = useParams(); // Retrieve freelancerId from URL
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Freelancer ID:", freelancerId);
    fetch(`http://127.0.0.1:5000/freelancer_details/${freelancerId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Ensure the response is parsed as JSON.
      })
      .then((freelancerDetails) => {
        // Fetch recommended jobs using freelancerDetails.
        fetch('http://127.0.0.1:5000/recommend_jobs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(freelancerDetails),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            setJobs(data);
            setFilteredJobs(data);
          })
          .catch((error) => {
            console.error('Error fetching jobs:', error);
            setError(error.message);
          });
      })
      .catch((error) => {
        console.error('Error fetching freelancer details:', error);
        setError(error.message);
      });
  }, [freelancerId]);

  const handleSearch = (query) => {
    const filtered = jobs.filter(job =>
      job.job.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredJobs(filtered);
  };

  const handleFilter = (filters) => {
    const filtered = jobs.filter(job =>
      (!filters.skills || job.job.skills.toLowerCase().includes(filters.skills.toLowerCase())) &&
      (!filters.location || job.job.location.toLowerCase().includes(filters.location.toLowerCase())) &&
      (!filters.hourlyRate || job.job.hourlyRate <= parseFloat(filters.hourlyRate))
    );
    setFilteredJobs(filtered);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="freelancer-dashboard">
      <h1>Recommended Jobs</h1>
      <Search onSearch={handleSearch} />
      <Filter onFilter={handleFilter} />
      <div className="job-cards-container">
        {filteredJobs.map((recommendation) => (
          <JobCard key={recommendation.job.id} job={recommendation.job} score={recommendation.score} />
        ))}
      </div>
    </div>
  );
}

export default FreelancerDashboard;