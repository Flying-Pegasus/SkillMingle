import React from 'react';
import FreelancerDashboard from './components/FreelancerDashboard';
import EmployerDashboard from './components/EmployerDashboard';
import HomePage from './components/HomePage';
import freeLancerApplication from './components/FreeLancerApp';
import employerApplication from './components/EmployerApp';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <h1>SkillMingle</h1>
      <Switch>
        <Route path="/freelancerapp" component={freeLancerApplication} />
        <Route path="/jobsdashboard" component={FreelancerDashboard} />
        <Route path="/employerapp" component={employerApplication} />
        <Route path="/freelancerdashboard" component={EmployerDashboard} />
        <Route path="/" component={HomePage} />
        {/* <Route path="/employer/dashboard" element={<EmployerDashboard />} /> */}
      </Switch>
    </Router>
  );
}

export default App;
