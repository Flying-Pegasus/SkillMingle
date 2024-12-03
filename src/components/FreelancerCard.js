import React from 'react';
import '../styles/FreelancerCard.css'; // Optional CSS for styling.

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
            <p><strong>Hourly Rate:</strong> ${hourlyRate.toFixed(2)}/hr</p>
            <p><strong>Job Success:</strong> {jobSuccess}%</p>
            <p><strong>Total Hours Worked:</strong> {totalHours}</p>
            <p><strong>Total Jobs Completed:</strong> {totalJobs}</p>
            <p><strong>Skills:</strong> {skills.join(', ')}</p>
            <p><strong>Recommendation Score:</strong> {score.toFixed(2)}</p>
        </div>
    );
}

export default FreelancerCard;
