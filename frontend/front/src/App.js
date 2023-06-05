import React, { useState } from"react";
import './App.css';
import './Services/App.css';
import { Login } from './Login';
import { Registration } from './Registration';
import { Service } from './Services/Service';


function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName)


  }

  return (
    <div className="App">
      {
        currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Service onFormSwitch={toggleForm} />
         
  
      }
      </div>
  );
}

export default App;
