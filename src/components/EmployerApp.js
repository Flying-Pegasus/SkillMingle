import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import '../styles/Form.css';

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
      skills: formData.skills.split(",").map((skill) => skill.trim()), // Array of strings
    };

    // First, directly fetch freelancer recommendations before saving the job
    fetch("http://127.0.0.1:5000/recommend_freelancers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employerData), // Pass the job data directly to the recommendation endpoint
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch freelancer recommendations.");
        }
        return response.json();
      })
      .then((freelancerData) => {
        // Now display the freelancer recommendations
        history.push({
          pathname: "/freelancerdashboard",
          state: {
            jobDetails: employerData, // Pass the job details
            freelancerRecommendations: freelancerData, // Pass the freelancer recommendations
          },
        });

        // After displaying recommendations, save the job data to job.json
        return fetch("http://127.0.0.1:5000/store_job", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(employerData),
        });
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to store job details.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Job stored successfully with ID:", data.id);
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

    <div className="container">
      <div className="text">Employer Job Details</div>
      <form onSubmit={handleSubmit}>
        <h3>Register : </h3>
        <div className="form-row">
          <div className="input-data">
            <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} required />
            <div className="underline"></div>
            <label>Job Title</label>
          </div>
          <div className="input-data">
            <input type="number" name="exLevelDemand" value={formData.exLevelDemand} onChange={handleChange} required />
            <div className="underline"></div>
            <label>Experience Level Demand</label>
          </div>
        </div>
        <div className="form-row">
          <div className="input-data">
            <input type="text" name="clientCountry" value={formData.clientCountry} onChange={handleChange} required />
            <div className="underline"></div>
            <label>Location</label>
          </div>
          <div className="input-data">
            <input type="number" name="rating" value={formData.rating} step="0.1" onChange={handleChange} required />
            <div className="underline"></div>
            <label>Rating</label>
          </div>
        </div>
        <div className="form-row">
          <div className="input-data">
            <input type="number" name="feedbackNum" value={formData.feedbackNum} onChange={handleChange} required />
            <div className="underline"></div>
            <label>Feedback Number</label>
          </div>
          <div className="input-data">
            <input type="text" name="paymentType" value={formData.paymentType} onChange={handleChange} required />
            <div className="underline"></div>
            <label>Payment Type</label>
          </div>
        </div>
        <div className="form-row">
          <div className="input-data">
            <input type="text" name="hourlyRate" value={formData.hourlyRate} onChange={handleChange} required />
            <div className="underline"></div>
            <label>Hourly Rate (e.g., "$30.00-$75.00")</label>
          </div>
          <div className="input-data">
            <input type="number" name="startRate" value={formData.startRate} onChange={handleChange} required />
            <div className="underline"></div>
            <label>Start Rate</label>
          </div>
        </div>
        <div className="form-row">
          <div className="input-data">
            <input type="number" name="endRate" value={formData.endRate} onChange={handleChange} required />
            <div className="underline"></div>
            <label>End Rate</label>
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
            <input type="text" value={jobId} onChange={(e) => setJobId(e.target.value)} required />
            <div className="underline"></div>
            <label>Job ID</label>
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

export default EmployerApp;








