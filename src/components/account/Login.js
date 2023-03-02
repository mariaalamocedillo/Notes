import React, { useState, useEffect } from 'react';
import './account.scss';
import api from '../../api/axiosConfig';
import { Link } from 'react-router-dom'

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", {
        username,
        password,
      }, {
        headers: {
          'Authorization': `Bearer ${window.sessionStorage.getItem('userToken')}` 
        }
      }).then(response => {
          console.log(response.data);
          window.sessionStorage.setItem('userToken', response.data);
          window.location.href = "/";
        });;
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="account-window">
    <div className="c-browser-bar login">
      <span className="c-browser-bar-dot"></span>
      <span className="c-browser-bar-dot"></span>
      <span className="c-browser-bar-dot"></span>
      <span className="c-browser-bar-close"></span>
    </div>
    <div className="c-browser-content ">
      <form className='account-form' onSubmit={handleSubmit}>
        <h3 className="c-subtitle">Login</h3>

        <div className="form-group">
          <span className='user-icon'></span>
          <input
            type="text"
            className="input-user"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <span className='psswd-icon'></span>
          <input
            type="password"
            className="input-psswd"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <p className='mssg-no-account'>¿No tienes cuenta? <Link to={"../register"}>Registrarse</Link></p>
        <button type="submit" className="btn btn-primary btn-block">
          Login
        </button>
      </form>
    </div>
    </div>

  );
};

export default Login;
