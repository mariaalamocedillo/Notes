import React from "react";
import './Hero.scss';
import 'react-edit-text/dist/index.css';
import NoteForm from "../noteForm/NoteForm";
import SendNoteForm from "../noteForm/SendNoteForm";
import {Container, Row, Col} from "react-bootstrap";

const Hero = ({listNotes}) => {
    return(
            <Row className="cards-container">
                {
                    listNotes.map((note) =>{
                        return(
                                <div className={"card " + note.colour} key={note.id}>
                                    <NoteForm defaultText={note.tasks} defaultTitle={note.name} defaultId={note.id} className="editabletxt" />
                                    <span className="author">~{note.author}</span>
                                </div>
                        )
                    })
                }
            </Row>
    )
}

export default Hero