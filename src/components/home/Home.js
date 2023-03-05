import Hero from "../hero/Hero";
import { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';
import NoteForm from "../noteForm/NoteForm";
import SendNoteForm from "../noteForm/SendNoteForm";
import FloatButton from "../floatButton/FloatButton";
import { Container, Row, Col } from "react-bootstrap";

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
        <>
            <Container className="container">
                <Row>
                    <Col className="new-note-box create-palette">
                        <NoteForm defaultText={"Write it..."} defaultTitle={"Name it..."} className="editabletxt" />
                    </Col>
                    <Col className="new-note-box send-palette">
                        <SendNoteForm defaultText={"Write it..."} defaultTitle={"Send it..."} className="editabletxt" />
                    </Col>
                </Row>

                <Hero listNotes = {notes}/>
                
            </Container>
            <FloatButton />
        </>
    )
}

export default Home