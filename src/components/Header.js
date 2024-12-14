import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Header.css';

function Header() {
    const location = useLocation();
    const isDashboard = location.pathname.includes('/dashboard') || location.pathname.includes('/jobsdashboard');

    return (
        <header className="header">
            <Link to="/" className="logo">SkillMingle</Link>
            <nav className="nav">
                <Link to="/freelancerapp" className="nav-link">Freelancer</Link>
                <Link to="/employerapp" className="nav-link">Employer</Link>
            </nav>
        </header>
    );
}

export default Header;