import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom"; // Import useHistory

function FreelancerApp() {
  const [name, setName] = useState("");
  const [skills, setSkills] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [rating, setRating] = useState("");
  const history = useHistory(); // Initialize useHistory for navigation

  const handleSubmit = (e) => {
    e.preventDefault();

    const freelancerData = {
      name: name,
      skills: skills.split(",").map((skill) => skill.trim()),
      hourly_rate: hourlyRate,
      rating: rating,
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
          // Navigate to FreelancerDashboard with freelancerId as query parameter
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
          type="text"
          value={hourlyRate}
          onChange={(e) => setHourlyRate(e.target.value)}
          required
        />
        <br />
        <label>Rating: </label>
        <input
          type="text"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        />
        <br />
        <button type="submit">Submit</button>
        <Link to="/jobsdashboard">
          <button className="apply-button">Already Logged In</button>
        </Link>
      </form>
    </div>
  );
}

export default FreelancerApp;
