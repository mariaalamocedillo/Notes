import Hero from "../hero/Hero";
import { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';

const Home = () => {   
    const [notes, setNotes] = useState([]);
    const [error, setError] = useState(null);

    const getNotes = async () => {
        
        try {
            const response = await api.post("/auth/myNotes", {}, 
                {
                    headers: {
                        'Authorization': `Bearer ${window.sessionStorage.getItem('userToken')}` 
                    }
                })
              .then(response => {
                console.log(response.data);
                setNotes(response.data);
              })
        } catch (err) {
            console.log(err);
            setError(err);
        }
    };    
  
    useEffect(() => {
        getNotes();
      }, []);
    
    return(
        <Hero listNotes = {notes}/>
    )
}

export default Home