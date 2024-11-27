import React from 'react';
import FreelancerDashboard from './components/FreelancerDashboard';
import EmployerDashboard from './components/EmployerDashboard';
import HomePage from './components/HomePage';
import Application from './components/FreeLancerApp';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <h1>SkillMingle</h1>
      <Switch>
        <Route path="/freelancer" component={Application} />
        <Route path="/dashboard" component={FreelancerDashboard} />
        <Route path="/employer" component={EmployerDashboard} />
        <Route path="/" component={HomePage} />
        {/* <Route path="/employer/dashboard" element={<EmployerDashboard />} /> */}
      </Switch>
    </Router>
  );
}

export default App;
