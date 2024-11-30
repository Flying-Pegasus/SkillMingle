import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function FreelancerApp() {
  const [name, setName] = useState("");
  const [skills, setSkills] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [location, setLocation] = useState(""); 
  const [existingName, setExistingName] = useState(""); // Input for "Already Logged In"
  const history = useHistory(); 

  // Function to handle new freelancer form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Convert hourly rate to a number before submission
    const convertedHourlyRate = parseFloat(hourlyRate);
    if (isNaN(convertedHourlyRate)) {
      alert("Please enter a valid numeric value for Hourly Rate!");
      return;
    }
  
    const freelancerData = {
      name: name,
      skills: skills.split(",").map((skill) => skill.trim()),
      hourly_rate: convertedHourlyRate, // Submit as a number
      location: location, // Add location field if applicable
    };
  
    fetch("http://127.0.0.1:5000/add_freelancer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(freelancerData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Freelancer added:", data);
        if (data.freelancer_id) {
          history.push(`/jobsdashboard?freelancerId=${data.freelancer_id}`);
        } else {
          alert("Error adding freelancer. Please try again!");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Something went wrong!");
      });
  };
  

  // Function to check if the freelancer already exists
  const handleLogin = () => {
    fetch("http://127.0.0.1:5000/freelancers")
      .then((response) => response.json())
      .then((data) => {
        const freelancer = data.find((f) => f.name === existingName);
        if (freelancer) {
          history.push(`/jobsdashboard?freelancerId=${freelancer.id}`);
        } else {
          alert("Freelancer not found. Please fill out the form to register.");
        }
      })
      .catch((error) => {
        console.error("Error fetching freelancers:", error);
        alert("Something went wrong!");
      });
  };

  return (
    <div>
      <h3>Enter Freelancer Details</h3>
      <form onSubmit={handleSubmit}>
        <label>Name: </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <label>Skills (comma separated): </label>
        <input
          type="text"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          required
        />
        <br />
        <label>Hourly Rate: </label>
        <input
          type="number"
          value={hourlyRate}
          onChange={(e) => setHourlyRate(e.target.value)}
          required
        />
        <br />
        <label>Location: </label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <br />
        <button type="submit">Submit</button>
      </form>

      <h3>Already Logged In?</h3>
      <label>Enter Your Name: </label>
      <input
        type="text"
        value={existingName}
        onChange={(e) => setExistingName(e.target.value)}
        placeholder="Enter your name"
        required
      />
      <button onClick={handleLogin}>Go to Dashboard</button>
    </div>
  );
}

export default FreelancerApp;
