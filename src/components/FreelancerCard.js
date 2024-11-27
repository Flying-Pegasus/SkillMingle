import React from 'react';
import '../styles/FreelancerCard.css';


function FreelancerCard({ freelancer }) {
  const handleContactClick = () => {
    alert(`Contacting ${freelancer.name}...`);
  };

  return (
    <div className="freelancer-card">
      <h3>{freelancer.name}</h3>
      <p><strong>Skills:</strong> {freelancer.skills.join(', ')}</p>
      <p><strong>Rating:</strong> {freelancer.rating} / 5</p>
      <p><strong>Availability:</strong> 
        <span className={freelancer.availability === "Available" ? "available" : "busy"}>
          {freelancer.availability}
        </span>
      </p>
      <p><strong>Hourly Rate:</strong> {freelancer.hourlyRate}</p>
      <button className="contact-button" onClick={handleContactClick}>
        Contact
      </button>
    </div>
  );
}

export default FreelancerCard;
