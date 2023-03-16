import { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';
import "./Home.scss";
import NoteForm from "../noteForm/NoteForm";
import SendNoteForm from "../noteForm/SendNoteForm";
import FloatButton from "../floatButton/FloatButton";
import { Container, Row, Col } from "react-bootstrap";
import Hero from './Hero';


const Home = () => {   
    const [listNotes, setListNotes] = useState([]);
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
                setListNotes(response.data);
              })
        } catch (err) {
            console.log(err);
            if (err.response && err.response.status === 401) {
                // The user is not logged in; must delete the token
                window.sessionStorage.removeItem('userToken');
                window.location.href = "/login";
              } else {
                // Some other error occurred
                setError('An error occurred while processing your request. Please try again later.');
              }
        }
    };    
  
    useEffect(() => {
        getNotes();
      }, []);


    return(
        <>
            <Container className="container">
                <Row>
                    <Col className="new-note-box create-palette">
                        <NoteForm onFetch={getNotes} defaultText={"Write it..."} defaultTitle={"Name it..."} className="editabletxt" />
                    </Col>
                    <Col className="new-note-box send-palette">
                        <SendNoteForm  onFetch={getNotes} defaultText={"Write it..."} defaultTitle={"Send it..."} className="editabletxt" />
                    </Col>
                </Row>
            <Hero listNotes={listNotes} onFetch={getNotes}/>
                
            </Container>
            <FloatButton />
        </>
    )
}

export default Home