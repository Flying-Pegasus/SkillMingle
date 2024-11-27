import React from 'react';
import '../styles/JobCard.css';
import { Link } from 'react-router-dom';

function Application() {

    return (
        <div>
            <div className="job-card">
                <h3>Application</h3>
                <Link to="/dashboard"><button className="apply-button" >Proceed</button></Link>
            </div>
            
        </div>
    );
}

export default Application;
