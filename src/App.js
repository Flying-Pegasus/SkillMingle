import React from "react";
import FreelancerDashboard from "./components/FreelancerDashboard";
import EmployerDashboard from "./components/EmployerDashboard";
import HomePage from "./components/HomePage";
import FreelancerApp from "./components/FreeLancerApp";
import EmployerApp from "./components/EmployerApp";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <h1>SkillMingle</h1>
      <Switch>
        <Route path="/freelancerapp" component={FreelancerApp} />
        <Route path="/jobsdashboard/:freelancerId" component={FreelancerDashboard} />
        <Route path="/employerapp" component={EmployerApp} />
        <Route path="/dashboard/:jobId" component={EmployerDashboard} />
        <Route path="/" component={HomePage} />
      </Switch>
    </Router>
  );
}

export default App;
