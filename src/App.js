import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FreelancerDashboard from "./components/FreelancerDashboard";
import EmployerDashboard from "./components/EmployerDashboard";
import HomePage from "./components/HomePage";
import FreelancerApp from "./components/FreeLancerApp";
import EmployerApp from "./components/EmployerApp";
import Profile from "./components/Profile";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <div className="container">
        <Switch>
          <Route path="/freelancerapp" component={FreelancerApp} />
          <Route path="/jobsdashboard/:freelancerId" component={FreelancerDashboard} />
          <Route path="/employerapp" component={EmployerApp} />
          <Route path="/dashboard/:jobId" component={EmployerDashboard} />
          <Route path="/profile" component={Profile} />
          <Route path="/" component={HomePage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;