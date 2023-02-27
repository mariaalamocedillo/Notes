import React, { useState } from "react";
import { EditText } from 'react-edit-text';
import api from '../../api/axiosConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

const noteForm = ({ defaultText, defaultTitle, defaultId, usernameAuthor }) => {
    const [text, setText] = useState(defaultText);
    const [title, setTitle] = useState(defaultTitle);
    const [id, setId] = useState(defaultId);
    const [author, setAuthor] = useState(usernameAuthor);

  const handleTextChange = val => {
    setText(val.value);
  };

  const handleTitleChange = val => {
    setTitle(val.value);
  }

  const handleSubmit = (event, updatedText, updatedTitle) => {
    event.preventDefault();
    if (id == null || id == undefined){ //sin id = nueva nota
      api
      .post("/notes/create", { "tasks": updatedText, "name": updatedTitle, "author": author, "created" : new Date()})
        .then((response) => {
          console.log("Successful create:", response);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {  //actualiza nota
      api
      .post("/notes/update", { "tasks": updatedText, "name": updatedTitle, "author": author, "id": id})
      .then((response) => {
        console.log("Successful update:", response);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    }
  };

  const handleDelete = (event) => {
    //event.preventDefault();
    api
    .post(`/notes/delete`, {"id" : id, "user" : author})
    .then((response) => {
      console.log("Successful delete:", response);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
    fetch(api.getUri() + "/notes/delete/" + id, { method: 'DELETE' })
        .then(() =>  alert("BIEEEEN"));
  };
  

  return (
  <form onSubmit={(event) => handleSubmit(event, text, title)}>
      {id ? <button className="deleteButton" onClick={handleDelete}><FontAwesomeIcon className="deleteIcon" icon={faTrashCan} /></button> : ''}
      <h2>
        <EditText
          defaultValue={title}
          onSave={handleTitleChange}
        />
      </h2>
      <div className="noteContent">
        <EditText
          multiline={true}
          defaultValue={text}
          onSave={handleTextChange}
        />
      </div>
      <button className="sendButton" type="submit">{id ? 'Guardar' : 'Crear'}</button>
    </form>
  );
}

export default noteForm;
