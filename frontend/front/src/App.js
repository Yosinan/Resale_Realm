import React, { useState } from "react";
// import { Router, Route, Switch } from "react-router";
import "./App.css";
import "./LandingPage/App.css";
import { Login } from "./Login";
import { Registration } from "./Registration";
// import { Service } from './Services/Service';

const App = () => {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName)

  }

  return (
    <div className="App">
      {
        currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Registration onFormSwitch={toggleForm} />
         
  
      }
    </div>
     
     
    
  );
};

export default App;
