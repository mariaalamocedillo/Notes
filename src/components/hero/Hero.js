import './Hero.scss';
import React, { useState } from "react";
import { EditText } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import NoteForm from "../noteForm/noteForm";


const Hero = ({listNotes}) => {
    return(
        <div className="container">
            <div className="cards-container">
                {
                    listNotes.map((note) =>{
                        return(
                                <div className="card" key={note.name}>
                                    
                                    <NoteForm defaultText={note.tasks} defaultTitle={note.name} defaultId={note.id} className="editabletxt" />
                                    <span className="author">~{note.author}</span>
                                </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Hero