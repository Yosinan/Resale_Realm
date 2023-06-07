// import React, { useState } from "react"

// export const Registration = (props) =>{
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [pass, setPass] = useState('');

//     const handleSubmit = (e)=>{
//         e.preventDefault();
//         console.log(email);
//     }

//     return(
//         <div className="form-container">
//         <form action="index.php" className="reg-form" conSubmit={handleSubmit}>
//         <h1>Inventory System</h1>
//             <h2>Register</h2>
//             <label htmlFor="name">Name</label>
//             <input value={name} onChange={(e) => setName(e.target.value)}name="name" id="name" placeholder="yourName" type="text" />
//             <label htmlFor="email">Email</label>
//             <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email"/>
//             <label htmlFor="password">Password</label>
//             <input  value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="*********" id="password" name="password"/>
//             <button className="" type="submit">Register</button>
//         </form>
//             <button className="btn" onClick={() => props.onFormSwitch ('login')} >Already have an account.Login</button>
        
//         </div>
//     )
// }


import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';

export const Registration = ({ togglePage }) => {
  // const history = useHistory();
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
        // Sign up successful, handle the response here
        const data = await response.json();
        setResponseMessage(data.message); // Update the response message
        // history.push('/login');
        console.log(data); // Example: display the response data

      } else {
        // Sign up failed, handle the error response here
        const error = await response.json();
        setResponseMessage(error.error); // Update the error message
        console.log(error); // Example: display the error message
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="form-container">
    <form className="reg-form" onSubmit={handleSubmit}>
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
    {responseMessage && <p>{responseMessage}</p>}
    <button onClick={togglePage}>Switch to Login</button>
    </div>
  );
};
