import React from "react";
import { BrowserRouter as Router, Switch, Route, useLocation } from "react-router-dom";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

function Main() {

  return (
    <>
      <div className="container">
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </>
  );
}

export default App;