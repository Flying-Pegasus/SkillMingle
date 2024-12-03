import React from 'react';
import '../styles/FreelancerCard.css';

function JobCard({ job, score }) {
    const {
        jobTitle,
        exLevelDemand,
        clientCountry,
        rating,
        feedbackNum,
        paymentType,
        hourlyRate,
        skills
    } = job;

    return (
        <div className="freelancer-card">
            <h3>{jobTitle}</h3>
            <p><strong>Experience Level:</strong> {exLevelDemand}</p>
            <p><strong>Location:</strong> {clientCountry}</p>
            <p><strong>Rating:</strong> {rating}/5</p>
            <p><strong>Number of feedbacks:</strong> {feedbackNum}</p>
            <p><strong>Payment Type:</strong> {paymentType}</p>
            <p><strong>Budget:</strong> {hourlyRate}</p>
            <p><strong>Skills:</strong> {skills.join(', ')}</p>
            <p><strong>Recommendation Score:</strong> {score.toFixed(2)}</p>
        </div>
    );
}

export default JobCard;
