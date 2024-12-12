import React, { useState,useEffect } from "react";
import "../styles/RatingForm.css"; // Add custom styles for the form if needed

function RatingForm() {
  const [rating, setRating] = useState(0); // To store the selected rating
  const [submitted, setSubmitted] = useState(false); // To track if the rating has been submitted

  useEffect(() => {
    console.log("RatingForm rendered");
  }, []);
  
  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Rating submitted:", rating);

    // Optional: Replace the following fetch with real logic when the backend is functional
    fetch("http://127.0.0.1:5000/submit_rating", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        setSubmitted(true);
      })
      .catch((error) => {
        console.error("Error submitting rating:", error);
      });
  };

  return (
    <div className="rating-form-container">
      <h3>Please Rate Our Recommendations </h3>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <div className="rating-buttons">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                type="button"
                key={value}
                className={`rating-button ${rating === value ? "selected" : ""}`}
                onClick={() => handleRatingChange(value)}
              >
                {value}
              </button>
            ))}
          </div>
          <button type="submit" className="submit-rating-button" disabled={rating === 0}>
            Submit Rating
          </button>
        </form>
      ) : (
        <p className="thank-you-message">Thank you for your feedback!</p>
      )}
    </div>
  );
}

export default RatingForm;
