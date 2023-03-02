import './App.scss';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Home from './components/home/Home';
import LoginForm from './components/account/Login';
import RegisterForm from './components/account/Register';
import { Routes, Route } from 'react-router-dom';
import AuthenticationFilter from './components/authenticationFilter/AuthenticationFilter';
function App() {

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!isLoading && !error && (
        <Routes>
            <Route path={"/"} element={<Layout />}>
              <Route path={"/"} element={<AuthenticationFilter><Home/></AuthenticationFilter>} />
              <Route path={"/register"} element={<RegisterForm/>} />
              <Route path={"/login"} element={<LoginForm/>} />
            </Route>
        </Routes>
      )}
    </>
  );
}

export default App;
