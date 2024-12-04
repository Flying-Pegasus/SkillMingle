import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

function Header() {
    return (
        <header className="header">
            <Link to="/" className="logo">SkillMingle</Link>
            <nav className="nav">
                <Link to="/freelancerapp" className="nav-link">Freelancer</Link>
                <Link to="/employerapp" className="nav-link">Employer</Link>
                <Link to="/profile" className="nav-link">Profile</Link>
            </nav>
        </header>
    );
}

export default Header;