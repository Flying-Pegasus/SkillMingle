import React from "react";
import "../styles/FreelancerCard.css";

function FreelancerCard({ freelancer }) {
  return (
    <div className="freelancer-card">
      <h3>{freelancer.name}</h3>
      <p>
        <strong>Skills:</strong> {freelancer.skills.join(", ")}
      </p>
      <p>
        <strong>Rating:</strong> {freelancer.rating} / 5
      </p>
      <p>
        <strong>Hourly Rate:</strong> ${freelancer.hourly_rate}/hr
      </p>
      <p>
        <strong>Recommendation Score:</strong> {freelancer.score*100} %
      </p>
      <button className="contact-button">Contact</button>
    </div>
  );
}

export default FreelancerCard;
