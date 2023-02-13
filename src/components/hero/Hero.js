import React from "react";
import './Hero.scss';
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import noteForm from "../noteForm/noteForm";


const Hero = ({listsTasks}) => {
    return(
        <div className="container">
            <div className="cards-container">
                {
                    listsTasks.map((list) =>{
                        return(
                                <div className="card" key={list.name}>
                                    <h2>{list.name}</h2>
                                    
                                    <EditText defaultValue={list.tasks} className="editabletxt" />
                                    <noteForm handleSubmit={addReview} revText={revText} labelText = "Write a Review?" />  

                                    <span className="author">~{list.author}</span>
                                </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Hero