import React, { useState } from 'react';
import '../styles/JobCard.css';
import { useHistory } from "react-router-dom";

function EmployerApp() {

    const [jobId, setJobId] = useState(""); // For login form
    const history = useHistory();
    const [formData, setFormData] = useState({
        jobTitle: "",
        exLevelDemand: 0,
        clientCountry: "",
        rating: 0,
        feedbackNum: 0,
        paymentType: "",
        hourlyRate: "",
        startRate: 0,
        endRate: 0,
        skills: "", // Holds comma-separated skills
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const employerData = {
            jobTitle: formData.jobTitle,
            exLevelDemand: parseInt(formData.exLevelDemand, 10), // Convert to integer
            clientCountry: formData.clientCountry,
            rating: parseFloat(formData.rating), // Convert to float
            feedbackNum: parseInt(formData.feedbackNum, 10), // Convert to integer
            paymentType: formData.paymentType,
            hourlyRate: formData.hourlyRate,
            startRate: parseInt(formData.startRate, 10), // Convert to integer
            endRate: parseInt(formData.endRate, 10), // Convert to integer
            skills: formData.skills.split(",").map(skill => skill.trim()), // Array of strings
        };

        fetch("http://127.0.0.1:5000/store_job", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(employerData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to store job details.");
                }
                return response.json();
            })
            .then((data) => {
                const newJobId = data.id; // Assuming the response contains the new job ID
                alert("Job details stored successfully!");

                // Redirect to dashboard with the new job ID
                history.push({
                    pathname: "/freelancerdashboard",
                    state: { jobDetails: { ...employerData, id: newJobId } },
                });
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("An error occurred. Please try again.");
            });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (jobId) {
            history.push(`/dashboard/${jobId}`);
        } else {
            alert('Please enter a valid Job ID');
        }
    };

    return (
        <div>
            <h3>Enter Employer Job Details</h3>
            <form onSubmit={handleSubmit}>
                <label>Job Title:</label>
                <input
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    required
                />
                <br />
                <label>Experience Level Demand:</label>
                <input
                    type="number"
                    name="exLevelDemand"
                    value={formData.exLevelDemand}
                    onChange={handleChange}
                    required
                />
                <br />
                <label>Client Country:</label>
                <input
                    type="text"
                    name="clientCountry"
                    value={formData.clientCountry}
                    onChange={handleChange}
                    required
                />
                <br />
                <label>Rating:</label>
                <input
                    type="number"
                    name="rating"
                    value={formData.rating}
                    step="0.1"
                    onChange={handleChange}
                    required
                />
                <br />
                <label>Feedback Number:</label>
                <input
                    type="number"
                    name="feedbackNum"
                    value={formData.feedbackNum}
                    onChange={handleChange}
                    required
                />
                <br />
                <label>Payment Type:</label>
                <input
                    type="text"
                    name="paymentType"
                    value={formData.paymentType}
                    onChange={handleChange}
                    required
                />
                <br />
                <label>Hourly Rate (e.g., "$30.00-$75.00"):</label>
                <input
                    type="text"
                    name="hourlyRate"
                    value={formData.hourlyRate}
                    onChange={handleChange}
                    required
                />
                <br />
                <label>Start Rate:</label>
                <input
                    type="number"
                    name="startRate"
                    value={formData.startRate}
                    onChange={handleChange}
                    required
                />
                <br />
                <label>End Rate:</label>
                <input
                    type="number"
                    name="endRate"
                    value={formData.endRate}
                    onChange={handleChange}
                    required
                />
                <br />
                <label>Skills (comma separated):</label>
                <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    required
                />
                <br />
                <button type="submit">Submit</button>
            </form>


            <h3>Already LoggedIn?</h3>
            <form onSubmit={handleLogin}>
                <label>Job ID:</label>
                <input
                    type="text"
                    value={jobId}
                    onChange={(e) => setJobId(e.target.value)}
                    required
                />
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default EmployerApp;
