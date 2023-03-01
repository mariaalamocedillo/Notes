import React, { useState, useEffect } from 'react';
import './account.scss';
import api from '../../api/axiosConfig';
import { Link } from 'react-router-dom'

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userToken, setUserToken] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await api.post("/auth/login", {
        username,
        password,
      }).then(response => {
          setUserToken(response.data);
          document.cookie = `token=${response.data}; Path=/`;
          window.sessionStorage.setItem('userToken', JSON.stringify(userToken));
        });;
    } catch (error) {
      console.error(error);
    }
    
    try {
      const response = await api.post("/auth/me", {
        //...data
      }, {
        headers: {
          'Authorization': `Bearer ${userToken}` 
        }
      })
      .then(response => {
        console.log(response.data);
      })
    } catch (error) {
      console.error(error);
    }

  };


  return (
    <div className="account-window">
    <div class="c-browser-bar">
      <span class="c-browser-bar-dot"></span>
      <span class="c-browser-bar-dot"></span>
      <span class="c-browser-bar-dot"></span>
      <span class="c-browser-bar-close"></span>
    </div>
    <div class="c-browser-content ">
      <form className='account-form' onSubmit={handleSubmit}>
        <h3 class="c-subtitle">Login</h3>

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
