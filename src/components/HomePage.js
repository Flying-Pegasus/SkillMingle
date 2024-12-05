import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

function HomePage() {
    return (
        <div className="homepage">
            <h2>Welcome to SkillMingle</h2>
            <div className="card-container">
                <div className="card">
                    <h3>Freelancer</h3>
                    <Link to="/freelancerapp">
                        <button className="apply-button">Freelancer</button>
                    </Link>
                </div>
                <div className="card">
                    <h3>Employer</h3>
                    <Link to="/employerapp">
                        <button className="apply-button">Employer</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default HomePage;