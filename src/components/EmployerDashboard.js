import React, { useState, useEffect } from 'react';
import FreelancerCard from './FreelancerCard';
import '../styles/EmployerDashboard.css';
import freelancersDetails from './ExampleFreelancers'

function EmployerDashboard() {
  const [freelancers, setFreelancers] = useState([]);

  useEffect(() => {
    // Fetch data from the JSON file
    fetch('/exampleFreelancers.json')
      .then(response => response.json())
      .then(data => setFreelancers(data));
  }, []);

  return (
    <div className="employer-dashboard">
      <h2>Recommended Freelancers</h2>
      <div className="freelancers-list">
        {freelancersDetails.map(freelancer => (
          <FreelancerCard key={freelancer.id} freelancer={freelancer} />
        ))}
      </div>
    </div>
  );
}

export default EmployerDashboard;
