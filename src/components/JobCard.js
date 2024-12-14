import React from 'react';
import '../styles/JobCard.css';

function JobCard({ job, score }) {
    const {
        jobTitle,
        exLevelDemand,
        clientCountry,
        rating,
        feedbackNum,
        paymentType,
        startRate,
        endRate,
        skills,
    } = job;

    return (
        <div className="job-card">
            <h3>{jobTitle}</h3>

            <p><strong>Experience Level:</strong> {exLevelDemand}</p>
            <p><strong>Location:</strong> {clientCountry}</p>
            <hr />

            <p><strong>Rating:</strong> {rating}/5</p>
            <p><strong>Feedbacks:</strong> {feedbackNum}</p>
            <hr />

            <p><strong>Payment Type:</strong> {paymentType}</p>
            <p><strong>Budget:</strong> ${startRate} - ${endRate}</p>
            <hr />

            <p><strong>Skills:</strong></p>
            <div>
                {skills.map((skill, index) => (
                    <span key={index} className="skills-badge">{skill}</span>
                ))}
            </div>
            <hr />

            <p><strong>Recommendation Score:</strong> {score.toFixed(2)}</p>
            <div className="button-container">
                <button className="apply-button">Apply</button>
            </div>
        </div>
    );
}

export default JobCard;
