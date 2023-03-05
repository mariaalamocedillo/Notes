import React, { useState, useEffect } from 'react';
import './account.scss';
import api from '../../api/axiosConfig';
import { Link } from 'react-router-dom'

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

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
    const params = new URLSearchParams(window.location.search);
    const tokenRemoved = params.get('token_removed') === 'true';
    if (tokenRemoved) {
      // If the user clicked logout button, we delete the session
      window.sessionStorage.removeItem('userToken');
    } else {
      checkSession(); //if not, we just check if there is a session already
    }
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if(username == '' || password == ''){
      console.log("Pon un user");
      setError("You must enter an username and a password")
    } else {
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
        setError("The username and password doesn't match");
      }
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
        
        {error && <p className='mssg-error'>{error}</p>}

        <p className='mssg-no-account'>Don't have an account? <Link to={"../register"}>Register</Link></p>

        <button type="submit" className="btn btn-primary btn-block">
          Login
        </button>
      </form>
    </div>
    </div>

  );
};

export default Login;
