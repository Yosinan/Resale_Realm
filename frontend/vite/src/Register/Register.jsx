import React, { useState, useEffect } from 'react';
import './Register.css';

const PasswordStrengthIndicator = ({ password }) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialCharacter = /[!@#$%^&*()_+\-=[\]{};':"|,.<>/?]/.test(password);

  const getColor = () => {
 
    if (password.length === 0) {
      return 'gray'; // Default color
    }
    if (password.length < 8 ) {
      return 'red'; // Weak password
    }
    if ( password.length > 8 && hasUppercase && hasLowercase && hasNumber && hasSpecialCharacter) {
    return 'green'; // Strong password
    }
    if (password.length >= 8  ) {
        return 'orange'; // Medium password
      }
  };

    const getPasswordStrength = () => {
        if (password.length <= 6) return '';
        if (password.length < 8 && password.length > 6) return 'Weak';
        if (password.length > 8 && hasUppercase && hasLowercase && hasNumber && hasSpecialCharacter) return 'Strong';
        if (password.length >= 8) return 'Good';
    };

    return (
        <span style={{ color: getColor() }}>{getPasswordStrength()}</span>
    );
    };

function Register  ({ togglePage }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [enable, setEnable] = useState(true);

 
    useEffect(() => {
        if (password.length < 6 || name.length < 3 || email.length < 6 || confirmPassword.length < 6) {
            setEnable(false);
        } else {
            setEnable(true);
        }
    }, [name, email,password, confirmPassword ]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setResponseMessage('Passwords do not match');
      return;
    }
    

    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setResponseMessage(data.message);
        togglePage();
      } else {
        const error = await response.json();
        setResponseMessage(error.error);
      }
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage(error.message);
    }
  };

  return (
    <div className="form-container">
      {responseMessage && (
        <p>{responseMessage}</p>
      )}
      <form className="reg-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <label htmlFor='user'>Name</label>
          <input
            type="text"
            value={name}
            placeholder='Name'
            required={true}
            name='user'
            id='user'
            onChange={(e) => setName(e.target.value)}
          />
        <label htmlFor='email'>Email</label>
          <input
            type="email"
            value={email}
            required={true}
            name='email'
            id='email'
            placeholder='youremail@example.com'
            onChange={(e) => setEmail(e.target.value)}
          />
        <label htmlFor='password'>Password</label>
          <input
            type="password"
            placeholder='*********'
            value={password}
            required={true}
            name='password'
            id='password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <PasswordStrengthIndicator password={password} />
        
        <label htmlFor='confirmPass'>Confirm Password</label>
          <input
            type="password"
            placeholder='*********'
            value={confirmPassword}
            name='confirmPass'
            id='confirmPass'
            required={true}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        <br />
        <button className="reg" disabled={!enable} type="submit">Sign Up</button>
      </form>
      <button className="tog"  onClick={togglePage}>
        Switch to Login
      </button>
    </div>
  );
  
};

export default Register;