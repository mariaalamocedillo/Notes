import "./Home.scss";
import NoteForm from "../noteForm/NoteForm";
import { Row } from "react-bootstrap";

const Hero = ({ listNotes, onFetch }) => {   
    
    return(
        <Row className="cards-container">
        {
            listNotes.map((note) =>{
                return(
                        <div className={"card " + note.colour} key={note.id}>
                            <NoteForm editable={note.author == note.holder} onFetch={onFetch} 
                                defaultText={note.tasks} defaultTitle={note.name} 
                                defaultId={note.id} className="editabletxt" />
                            <span className="author">~{note.author}</span>
                        </div>
                )
            })
        }
        </Row>
    )
}

export default Hero