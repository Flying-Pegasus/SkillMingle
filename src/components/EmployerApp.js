import React, { useState } from 'react';
import '../styles/JobCard.css';
import { Link } from 'react-router-dom';


function EmployerForm() {
    const [company, setCompany] = useState("");
    const [title, setTitle] = useState("");
    const [skillsRequired, setSkillsRequired] = useState("");
    const [budget, setBudget] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const employerData = {
            company: company,
            title: title,
            skills_required: skillsRequired.split(",").map(skill => skill.trim()),
            budget: budget,
        };

        fetch("http://127.0.0.1:5000/add_employer", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(employerData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Employer added:", data);
                alert("Employer job details added successfully!");
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <div>
            <h3>Enter Employer Job Details</h3>
            <form onSubmit={handleSubmit}>
                <label>Company: </label>
                <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    required
                />
                <br />
                <label>Job Title: </label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <br />
                <label>Skills Required (comma separated): </label>
                <input
                    type="text"
                    value={skillsRequired}
                    onChange={(e) => setSkillsRequired(e.target.value)}
                    required
                />
                <br />
                <label>Budget: </label>
                <input
                    type="text"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    required
                />
                <br />
                <button type="submit">Submit</button>
                <Link to="/freelancerdashboard"><button className='apply-button'>Already logged in</button></Link>
            </form>
        </div>
    );
}

export default EmployerForm;




