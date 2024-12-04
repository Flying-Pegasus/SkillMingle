import React, { useState, useEffect } from 'react';
import '../styles/Profile.css';

function Profile() {
    const [freelancer, setFreelancer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch freelancer details from freelancer.json
        fetch('/path/to/freelancer.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Assuming the freelancer ID is 1 for demonstration
                const freelancerDetails = data.find(f => f.id === 1);
                setFreelancer(freelancerDetails);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!freelancer) {
        return <div>No freelancer data found.</div>;
    }

    return (
        <div className="profile">
            <h2>Profile</h2>
            <p><strong>Name:</strong> {freelancer.name}</p>
            <p><strong>Country:</strong> {freelancer.country}</p>
            <p><strong>Hourly Rate:</strong> ${freelancer.hourlyRate}/hr</p>
            <p><strong>Job Success:</strong> {freelancer.jobSuccess}%</p>
            <p><strong>Title:</strong> {freelancer.title}</p>
            <p><strong>Total Hours Worked:</strong> {freelancer.totalHours}</p>
            <p><strong>Total Jobs Completed:</strong> {freelancer.totalJobs}</p>
            <p><strong>Skills:</strong> {freelancer.skills.join(', ')}</p>
        </div>
    );
}

export default Profile;