import React from "react";
import './Hero.scss';
import 'react-edit-text/dist/index.css';
import NoteForm from "../noteForm/NoteForm";


const Hero = ({listNotes}) => {
    return(
        <div className="container">
            <div className="create-card">
                <NoteForm defaultText={"Write it"} defaultTitle={"Name it"} className="editabletxt" />
            </div>
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