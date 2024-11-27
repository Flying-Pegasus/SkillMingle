import React, { useState } from "react";
import { Link } from 'react-router-dom';

function FreelancerForm() {
  const [name, setName] = useState("");
  const [skills, setSkills] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [rating, setRating] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const freelancerData = {
      name: name,
      skills: skills.split(",").map(skill => skill.trim()),
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
        alert("Freelancer details added successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
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
        <Link to="/jobsdashboard"><button className="apply-button">Already Logged in</button></Link>
      </form>
    </div>
  );
}

export default FreelancerForm;

{/* <Link to="/jobsdashboard"><button className="apply-button" >Proceed</button></Link> */}