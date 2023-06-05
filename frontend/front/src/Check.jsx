import React, { useState } from "react";
import axios from "axios";

const MyComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async () => {
    try {
      const response = await axios.post("/api/register", {
        name,
        email,
        password,
      });
      console.log(response.data);
      // Handle the response here
    } catch (error) {
      console.error(error);
      // Handle the error here
    }
  };

  const loginUser = async () => {
    try {
      const response = await axios.post("/api/login", { email, password });
      console.log(response.data);
      // Handle the response here
    } catch (error) {
      console.error(error);
      // Handle the error here
    }
  };

  const logoutUser = async () => {
    try {
      const response = await axios.post("/api/logout");
      console.log(response.data);
      // Handle the response here
    } catch (error) {
      console.error(error);
      // Handle the error here
    }
  };

  const getUser = async () => {
    try {
      const response = await axios.get("/api/user");
      console.log(response.data);
      // Handle the response here
    } catch (error) {
      console.error(error);
      // Handle the error here
    }
  };

  const getUserById = async (userId) => {
    try {
      const response = await axios.get(`/api/user/${userId}`);
      console.log(response.data);
      // Handle the response here
    } catch (error) {
      console.error(error);
      // Handle the error here
    }
  };

  return (
    <div>
      <h1>Register User</h1>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={registerUser}>Register</button>

      <h1>Login User</h1>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={loginUser}>Login</button>

      <h1>Logout User</h1>
      <button onClick={logoutUser}>Logout</button>

      <h1>Get User</h1>
      <button onClick={getUser}>Get User</button>

      <h1>Get User by ID</h1>
      <input type="text" placeholder="User ID" />
      <button onClick={() => getUserById(userId)}>Get User by ID</button>
    </div>
  );
};

export default MyComponent;
