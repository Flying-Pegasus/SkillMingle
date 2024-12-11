import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import '../styles/Form.css';

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
        // history.push({
        //   pathname: "/jobsdashboard",
        //   state: { freelancerDetails: { ...freelancerData, id: newfreelancerID } },
        // });
        history.push(`/jobsdashboard/${newfreelancerID}`);
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
    <div className="container">
      <div className="text">Freelancer Details</div>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="input-data">
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            <div className="underline"></div>
            <label>Name</label>
          </div>
          <div className="input-data">
            <input type="text" name="country" value={formData.country} onChange={handleChange} required />
            <div className="underline"></div>
            <label>Location</label>
          </div>
        </div>
        <div className="form-row">
          <div className="input-data">
            <input type="number" name="hourlyRate" value={formData.hourlyRate} onChange={handleChange} required />
            <div className="underline"></div>
            <label>Hourly Rate</label>
          </div>
          <div className="input-data">
            <input type="number" name="jobSuccess" value={formData.jobSuccess} onChange={handleChange} required />
            <div className="underline"></div>
            <label>Job Success Rate (%)</label>
          </div>
        </div>
        <div className="form-row">
          <div className="input-data">
            <input type="text" name="title" value={formData.title} onChange={handleChange} required />
            <div className="underline"></div>
            <label>Title</label>
          </div>
          <div className="input-data">
            <input type="number" name="totalHours" value={formData.totalHours} onChange={handleChange} required />
            <div className="underline"></div>
            <label>Total Hours Worked</label>
          </div>
        </div>
        <div className="form-row">
          <div className="input-data">
            <input type="number" name="totalJobs" value={formData.totalJobs} onChange={handleChange} required />
            <div className="underline"></div>
            <label>Total Jobs Completed</label>
          </div>
          <div className="input-data">
            <input type="text" name="skills" value={formData.skills} onChange={handleChange} required />
            <div className="underline"></div>
            <label>Skills (comma separated)</label>
          </div>
        </div>
        <div className="form-row submit-btn">
          <div className="input-data">
            <div className="inner"></div>
            <input type="submit" value="Submit" />
          </div>
        </div>
      </form>

      <h3>Already Logged In?</h3>
      <form onSubmit={handleLogin}>
        <div className="form-row">
          <div className="input-data">
            <input type="text" value={freelancerId} onChange={(e) => setFreelancerId(e.target.value)} required />
            <div className="underline"></div>
            <label>Freelancer ID</label>
          </div>
        </div>
        <div className="form-row submit-btn">
          <div className="input-data">
            <div className="inner"></div>
            <input type="submit" value="Login" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default FreelancerApp;