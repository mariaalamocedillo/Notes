import React, { useState, useEffect } from "react";
import './account.scss';
import api from '../../api/axiosConfig';
import { Link } from 'react-router-dom'

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");


  const checkSession = async () => {
    try {
      const response = api.post("/auth/check", {}, 
      {
          headers: {
          'Authorization': `Bearer ${window.sessionStorage.getItem('userToken')}` 
          }
      })
      .then(response => {
          if(response.data == "autorizado"){
              //console.log("Autorizado por el servidor");
            window.location.href = "/";
          } else {
            window.sessionStorage.removeItem('userToken');
          }
      })
    } catch (err) {
        console.log(err);
        setError(err);
    }
};    

  useEffect(() => {
    checkSession();
  }, []);

  const checkValid = async () => {
    if(username == '' || email == '' || password == '' || confirmPassword == ''){
      setError("You must enter all fields");
      return false;
    }
    if (password !== confirmPassword) {
      setError("The passwords don't match");
      return false;
    }
    setError("");
    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (checkValid()) {
      try {
        const response = await api.post("/auth/register", {
          username,
          email,
          password,
        }).then(response => {
          window.sessionStorage.setItem('userToken', response.data);
          window.location.href = "/";
      });;
        
        setError(response.data);
      } catch (error) {
        setError(error.response.data);
      }
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
          onChange={(e) => {setUsername(e.target.value); checkValid();}}
        />
      </div>
      <div>
        <span className='mail-icon'></span>
        <input
          type="email"
          name="email"
          placeholder="email"
          value={email}
          onChange={(e) => {setEmail(e.target.value); checkValid();}}
        />
      </div>
      <div>
          <span className='psswd-icon'></span>
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={(e) => {setPassword(e.target.value); checkValid();}}
        />
      </div>
      <div>
          <span className='psswd-icon'></span>
        <input
          type="password"
          name="confirm-password"
          placeholder="confirm password"
          value={confirmPassword}
          onChange={(e) => {setConfirmPassword(e.target.value); checkValid();}}
        />
      </div>
      {error && <p className='mssg-error'>{error}</p>}
      <p className='mssg-no-account'>Already have an account? <Link to={"../login"}>Enter here</Link></p>
      <button type="submit">Create</button>
    </form>
    </div>
    </div>
  );
};

export default Register;