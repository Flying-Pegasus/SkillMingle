import React from 'react';
import '../styles/FreelancerCard.css';

function FreelancerCard({ freelancer, score }) {
    const {
        name,
        country,
        hourlyRate,
        jobSuccess,
        title,
        totalHours,
        totalJobs,
        skills
    } = freelancer;

    return (
        <div className="freelancer-card">
            <h3>{name}</h3>

            <p><strong>Title:</strong> {title}</p>
            <p><strong>Country:</strong> {country}</p>
            <hr />

            <p><strong>Hourly Rate:</strong> ${hourlyRate.toFixed(2)}/hr</p>
            <p><strong>Job Success:</strong> {jobSuccess}%</p>
            <hr />

            <p><strong>Total Hours Worked:</strong> {totalHours}</p>
            <p><strong>Total Jobs Completed:</strong> {totalJobs}</p>
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
                <button className="contact-button">Contact</button>
            </div>
        </div>
    );
}

export default FreelancerCard;
