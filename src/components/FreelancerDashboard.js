import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import JobCard from './JobCard';

function FreelancerDashboard() {
  const { freelancerId } = useParams(); // Retrieve freelancerId from URL
  const [jobs, setJobs] = useState([]);
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
          .then((data) => setJobs(data))
          .catch((error) => {
            console.error('Error fetching jobs:', error);
            setError(error.message);
          });
      })
      .catch((error) => {
        console.error('Error fetching job details:', error);
        setError(error.message);
      });
  }, [freelancerId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {/* {freelancerDetails.jobTitle} */}
      <h1>Recommended Freelancers </h1>
      <div className="freelancer-cards">
        {jobs.map((recommendation) => (
          <JobCard key={recommendation.job.id} job={recommendation.job} score={recommendation.score} />
        ))}
      </div>
    </div>
  );
}

export default FreelancerDashboard;
