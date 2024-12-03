import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function FreelancerApp() {

  const [freelancerId, setFreelancerId] = useState(""); // For login form
  const history = useHistory();
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    hourlyRate: 0,
    jobSuccess: 0,
    title: "",
    totalHours: 0,
    totalJobs: 0,
    skills: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const freelancerData = {
      name: formData.name,
      country: formData.country,
      hourlyRate: parseFloat(formData.hourlyRate), // Convert to float
      jobSuccess: parseFloat(formData.jobSuccess), // Convert to float
      title: formData.title,
      totalHours: parseInt(formData.totalHours, 10), // Convert to integer
      totalJobs: parseInt(formData.totalJobs, 10), // Convert to integer
      skills: formData.skills.split(",").map(skill => skill.trim()), // Array of strings
    };

    fetch("http://127.0.0.1:5000/store_freelancer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(freelancerData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to store freelancer details.");
        }
        return response.json();
      })
      .then((data) => {
        const newfreelancerID = data.id; // Assuming the response contains the new job ID
        alert("Freelancer details stored successfully!");

        // Redirect to dashboard with the new job ID
        history.push({
          pathname: "/jobsdashboard",
          state: { freelancerDetails: { ...freelancerData, id: newfreelancerID } },
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
      });
  };

  // Handle job ID login
  const handleLogin = (e) => {
    e.preventDefault();
    if (freelancerId) {
        history.push(`/jobsdashboard/${freelancerId}`);
    } else {
        alert('Please enter a valid Freelancer ID');
    }
};

  return (
    <div>
      <h3>Enter Freelancer Details</h3>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <br />
        <label>Location:</label>
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          required
        />
        <br />
        <label>Hourly Rate:</label>
        <input
          type="number"
          name="hourlyRate"
          value={formData.hourlyRate}
          step="0.5"
          onChange={handleChange}
          required
        />
        <br />
        <label>Job Success Rate (%):</label>
        <input
          type="number"
          name="jobSuccess"
          value={formData.jobSuccess}
          step="0.5"
          onChange={handleChange}
          required
        />
        <br />
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <br />
        <label>Total Hours Worked:</label>
        <input
          type="number"
          name="totalHours"
          value={formData.totalHours}
          onChange={handleChange}
          required
        />
        <br />
        <label>Total Jobs:</label>
        <input
          type="number"
          name="totalJobs"
          value={formData.totalJobs}
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
        <label>Freelancer ID:</label>
        <input
          type="text"
          value={freelancerId}
          onChange={(e) => setFreelancerId(e.target.value)}
          required
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default FreelancerApp;
