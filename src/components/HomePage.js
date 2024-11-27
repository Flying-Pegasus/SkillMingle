import React from 'react';
import '../styles/JobCard.css';
import { Link } from 'react-router-dom';

function HomePage() {


    return (
        <div>
            <h2>Welcome to skillmingle</h2>
            <div className="job-card">
                <h3>FreeLancer</h3>
                <Link to="/freelancerapp">
                <button className="apply-button" >FreeLancer</button>
                </Link>
            </div>
            <div className="job-card">
                <h3>Employer</h3>
                <Link to="/employerapp">
                <button className="apply-button" >Employer</button>
                </Link>
            </div>
        </div>
    );
}

export default HomePage;
