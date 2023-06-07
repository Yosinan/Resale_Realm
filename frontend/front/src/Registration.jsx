import React, { useState } from 'react';

export const Registration = ({ togglePage }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Sign Up</button>
      </form>
      {responseMessage && (
        <p style={styles.responseMessage}>{responseMessage}</p>
      )}
      <button style={styles.button} onClick={togglePage}>
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
    color: 'red',
  },
};
