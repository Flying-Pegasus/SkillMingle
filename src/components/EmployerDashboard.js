import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FreelancerCard from './FreelancerCard';

// function Dashboard({ jobId })
function EmployerDashboard() {
  const { jobId } = useParams(); // Retrieve jobId from URL
  const [freelancers, setFreelancers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Job ID:", jobId);
    fetch(`http://127.0.0.1:5000/job_details/${jobId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Ensure the response is parsed as JSON.
      })
      .then((jobDetails) => {
        // Fetch recommended freelancers using jobDetails.
        fetch('http://127.0.0.1:5000/recommend_freelancers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(jobDetails),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => setFreelancers(data))
          .catch((error) => {
            console.error('Error fetching freelancers:', error);
            setError(error.message);
          });
      })
      .catch((error) => {
        console.error('Error fetching job details:', error);
        setError(error.message);
      });
  }, [jobId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {/* {jobDetails.jobTitle} */}
      <h1>Recommended Freelancers </h1>
      <div className="freelancer-cards">
        {freelancers.map((recommendation) => (
          <FreelancerCard key={recommendation.freelancer.id} freelancer={recommendation.freelancer} score={recommendation.score} />
        ))}
      </div>
    </div>
  );
}

export default EmployerDashboard;
