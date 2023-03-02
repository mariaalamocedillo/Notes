import React from "react";
import './Hero.scss';
import 'react-edit-text/dist/index.css';
import NoteForm from "../noteForm/NoteForm";
import {Container, Row, Col} from "react-bootstrap";

const Hero = ({listNotes}) => {

    
    return(
        <Container className="container">

        <Row>
            <Col className="new-note-box create-palette">
                <NoteForm defaultText={"Write it..."} defaultTitle={"Name it..."} className="editabletxt" />
            </Col>
            <Col className="new-note-box send-palette">
                <NoteForm defaultText={"Write it..."} defaultTitle={"Send it..."} className="editabletxt" />
            </Col>
        </Row>


            <div className="cards-container">
                {
                    listNotes.map((note) =>{
                        return(
                                <div className="card" key={note.id}>
                                    <NoteForm defaultText={note.tasks} defaultTitle={note.name} defaultId={note.id} className="editabletxt" />
                                    <span className="author">~{note.author}</span>
                                </div>
                        )
                    })
                }
            </div>
        </Container>
    )
}

export default Hero