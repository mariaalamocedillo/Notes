import React, { useState, useEffect } from 'react';

import api from '../../api/axiosConfig';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/me");
      console.log(response.data);
      
      // Aquí podrías guardar el token de sesión en el local storage o en una cookie
    } catch (error) {
      console.error(error);
    }
/* 
    try {
      const response = await api.post("/auth/login", {
        username,
        password,
      });
      console.log(response.data);
      
      // Aquí podrías guardar el token de sesión en el local storage o en una cookie
    } catch (error) {
      console.error(error);
    }*/
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
      <h3>Login</h3>

      <div className="form-group">
        <label>Username</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary btn-block">
        Login
      </button>
    </form>
    </>

  );
};

export default Login;
