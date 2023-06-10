import React, { useState } from 'react';

export const Registration = ({ togglePage }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

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
      } else {
        const error = await response.json();
        setResponseMessage(error.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="form-container" style={styles.container}>
      <form className="reg-form" style={styles.form} onSubmit={handleSubmit}>
        <h2> ELY </h2>
        <h2>Sign Up</h2>
        <label>
          Name:
          <input
            type="text"
            value={name}
            placeholder='Name'
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            placeholder='youremail@example.com'
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            placeholder='*********'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
        Confirm Password:
        <input
        type="password"
        placeholder='*********'
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}/>
        </label>
        <br />
        <button className="reg" type="submit">Sign Up</button>
      </form>
      {responseMessage && (
        <p style={styles.responseMessage}>{responseMessage}</p>
      )}
      <button className="tog" onClick={togglePage}>
        Switch to Login
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    padding: '10px 20px',
    marginTop: '10px',
    backgroundColor: '#4285f4',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
  responseMessage: {
    marginTop: '10px',
    color: 'brown',
  },
};
