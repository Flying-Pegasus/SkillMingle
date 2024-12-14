import React, { useEffect, useState } from 'react';
import '../styles/FreelancerDashboard.css';

function ShowAll() {
  const [freelancers, setFreelancers] = useState([]);
  const [filteredFreelancers, setFilteredFreelancers] = useState([]);
  const [filters, setFilters] = useState({
    country: "",
    skills: "",
    hourlyRateMin: "",
    hourlyRateMax: "",
  });

  useEffect(() => {
    // Fetch all freelancers from the backend
    fetch('http://127.0.0.1:5000/freelancers')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setFreelancers(data);
        setFilteredFreelancers(data); // Initialize filtered list with all freelancers
      })
      .catch((error) => {
        console.error('Error fetching freelancers:', error);
        alert('Error fetching freelancers. Please try again.');
      });
  }, []);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Apply filters to freelancers
  const applyFilters = () => {
    const { country, skills, hourlyRateMin, hourlyRateMax } = filters;

    // Split skills into an array of trimmed, lowercase values
    const skillFilterArray = skills
      .split(",")
      .map(skill => skill.trim().toLowerCase())
      .filter(skill => skill !== ""); // Remove empty strings

    const filtered = freelancers.filter((freelancer) => {
      const matchesCountry = country
        ? freelancer.country.toLowerCase().includes(country.toLowerCase())
        : true;

      const matchesSkills = skillFilterArray.length > 0
        ? skillFilterArray.some(skill =>
            freelancer.skills.map(s => s.toLowerCase()).includes(skill)
          )
        : true;

      const matchesHourlyRate =
        (hourlyRateMin ? freelancer.hourlyRate >= parseFloat(hourlyRateMin) : true) &&
        (hourlyRateMax ? freelancer.hourlyRate <= parseFloat(hourlyRateMax) : true);

      return matchesCountry && matchesSkills && matchesHourlyRate;
    });

    setFilteredFreelancers(filtered);
  };

  return (
    <div className="show-all-container">
      <h1>Freelancer Listings</h1>

      {/* Filter Section */}
      <div className="filter">
        <h4>Filter Freelancers</h4>
        <div className="filter-group">
          <label>
            Location:
            <input
              type="text"
              name="country"
              value={filters.country}
              onChange={handleFilterChange}
              placeholder="Enter location"
            />
          </label>
          <label>
            Skills (comma-separated):
            <input
              type="text"
              name="skills"
              value={filters.skills}
              onChange={handleFilterChange}
              placeholder="Enter skills (e.g., Python, React)"
            />
          </label>
          <label>
            Hourly Rate Min:
            <input
              type="number"
              name="hourlyRateMin"
              value={filters.hourlyRateMin}
              onChange={handleFilterChange}
              placeholder="Min rate"
            />
          </label>
          <label>
            Hourly Rate Max:
            <input
              type="number"
              name="hourlyRateMax"
              value={filters.hourlyRateMax}
              onChange={handleFilterChange}
              placeholder="Max rate"
            />
          </label>
          <button onClick={applyFilters}>Apply Filters</button>
        </div>
      </div>

      {/* Render freelancer cards */}
      <div className="freelancer-cards-container">
        {filteredFreelancers.map((freelancer) => (
          <div className="freelancer-card" key={freelancer.id}>
            <h3>{freelancer.name}</h3>
            <p><strong>Title:</strong> {freelancer.title}</p>
            <p><strong>Skills:</strong> {freelancer.skills.join(', ')}</p>
            <p><strong>Hourly Rate:</strong> ${freelancer.hourlyRate}/hr</p>
            <p><strong>Job Success:</strong> {freelancer.jobSuccess}%</p>
            <p><strong>Location:</strong> {freelancer.country}</p>
            <p><strong>Total Jobs:</strong> {freelancer.totalJobs}</p>
            <p><strong>Total Hours Worked:</strong> {freelancer.totalHours}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShowAll;
