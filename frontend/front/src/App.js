import React, { useState } from "react";
// import { Router, Route, Switch } from "react-router";
import "./App.css";
import "./LandingPage/App.css";
import { Login } from "./Login";
import { Registration } from "./Registration";
import { Dashboard } from "./Dashboard";
// import { Service } from './Services/Service';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginPage, setIsLoginPage] = useState(true);

  function handleLogin() {
    setIsLoggedIn(true);
  }

  function toggleLoginPage() {
    setIsLoginPage(!isLoginPage);
  }

  return (
    <div className="App">
      {isLoggedIn ? (
        <Dashboard />
      ) : isLoginPage ? (
        <Login onLogin={handleLogin} togglePage={toggleLoginPage} />
      ) : (
        <Registration togglePage={toggleLoginPage} />
      )}
    </div>
	 
  );
};

export default App;
