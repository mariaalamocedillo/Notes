import React, { useState } from "react";
import './account.scss';
import api from '../../api/axiosConfig';
import { Link } from 'react-router-dom'

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    try {
      const response = await api.post("/auth/register", {
        username,
        email,
        password,
      });
      console.log(response.data);
      setError("");
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.log(error.response.data);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="account-window">
    <div className="c-browser-bar">
      <span className="c-browser-bar-dot"></span>
      <span className="c-browser-bar-dot"></span>
      <span className="c-browser-bar-dot"></span>
      <span className="c-browser-bar-close"></span>
    </div>
    <div className="c-browser-content ">
    <form className='account-form' onSubmit={handleSubmit}>
      <h3 className="c-subtitle">Register</h3>

      <div>
        <span className='user-icon'></span>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <span className='mail-icon'></span>
        <input
          type="email"
          name="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
          <span className='psswd-icon'></span>
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
          <span className='psswd-icon'></span>
        <input
          type="password"
          name="confirm-password"
          placeholder="confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <p className='mssg-no-account'>Already have an account? <Link to={"../login"}>Enter here</Link></p>
      <button type="submit">Create</button>
      {error && <p>{error}</p>}
    </form>
    </div>
    </div>
  );
};

export default Register;