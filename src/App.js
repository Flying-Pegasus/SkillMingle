import React from "react";
import { BrowserRouter as Router, Switch, Route, useLocation } from "react-router-dom";
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
      <Main />
    </Router>
  );
}

function Main() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <>
      {!isHomePage && <Header />}
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
    </>
  );
}

export default App;