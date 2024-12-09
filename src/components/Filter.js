import React, { useState } from 'react';

function Filter({ onFilter }) {
  const [filters, setFilters] = useState({
    skills: '',
    location: '',
    hourlyRate: '',
  });

  const handleFilter = () => {
    onFilter(filters);
  };

  return (
    <div className="filter">
      <input
        type="text"
        value={filters.skills}
        onChange={(e) => setFilters({ ...filters, skills: e.target.value })}
        placeholder="Skills"
      />
      <input
        type="text"
        value={filters.location}
        onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        placeholder="Location"
      />
      <input
        type="text"
        value={filters.hourlyRate}
        onChange={(e) => setFilters({ ...filters, hourlyRate: e.target.value })}
        placeholder="Hourly Rate"
      />
      <button onClick={handleFilter}>Apply Filters</button>
    </div>
  );
}

export default Filter;