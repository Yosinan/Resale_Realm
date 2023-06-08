import React, { useState } from "react";
// import { Router, Route, Switch } from "react-router";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "./App.css";
import "./LandingPage/App.css";
import { Login } from "./Login";
import { Registration } from "./Registration";
import { Dashboard } from "./Dashboard";
import { Landing } from "./Landing";
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

/*{ <BrowserRouter>
<Routes>
  <Route exact path="/" component={Landing} />
  <Route path="/signup" component={Registration} />
  <Route path="/signin" component={Login} />
</Routes>

</BrowserRouter>
=======
</BrowserRouter> }*/


/*
<Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/signup">
          <SignupPage toggleAuthentication={toggleAuthentication} />
        </Route>
        <Route path="/login">
          <LoginPage toggleAuthentication={toggleAuthentication} />
        </Route>
        <Route path="/dashboard">
          {isAuthenticated ? <DashboardPage /> : <Redirect to="/login" />}
        </Route>
      </Switch>
      */
	 
  );
};

export default App;
