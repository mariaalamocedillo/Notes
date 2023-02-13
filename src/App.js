import './App.css';
import api from './api/axiosConfig';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Home from './components/home/Home';
import { Routes, Route } from 'react-router-dom';

function App() {

  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getTasks = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/tasks");
      console.log(response.data)
      setTasks(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!isLoading && !error && (
        <Routes>
          <Route path={"/"} element={<Layout />}>
            <Route path={"/"} element={<Home tasks={tasks}/>} />
          </Route>
        </Routes>
      )}
    </>
  );
}

export default App;
