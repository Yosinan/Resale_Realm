import { useState } from 'react'
import './App.css'
import Login from './Login/Login'
import Register from './Register/Register'
import Dashboard from './Dashboard/Dashboard'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginPage, setIsLoginPage] = useState(true);

  function handleLogin() {
    setIsLoggedIn(true);
  }

  function toggleLoginPage() {
    setIsLoginPage(!isLoginPage);
  }

  return (
    <>
      <div className="App">
        {isLoggedIn ? (
          <Dashboard />
        ) : isLoginPage ? (
          <Login onLogin={handleLogin} togglePage={toggleLoginPage} />
        ) : (
          <Register togglePage={toggleLoginPage} />
        )}
      </div>
    </>
  )
}

export default App;
