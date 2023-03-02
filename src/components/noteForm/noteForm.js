import React, { useState } from "react";
import { EditText } from 'react-edit-text';
import api from '../../api/axiosConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

const noteForm = ({ defaultText, defaultTitle, defaultId, sendNote }) => {
    const [text, setText] = useState(defaultText);
    const [title, setTitle] = useState(defaultTitle);
    const [id, setId] = useState(defaultId);
    const [sendTo, setSendTo] = useState("");

  const handleTextChange = val => {
    setText(val.value);
  };

  const handleTitleChange = val => {
    setTitle(val.value);
  }

  const handleSubmit = (event, updatedText, updatedTitle) => {
    event.preventDefault();
    if (id == null || id == undefined){ //sin id = nueva nota
      if(!sendNote) {
        api
        .post("/notes/create", { 
                                  "content": updatedText, "title": updatedTitle, "created" : new Date()
                                },
                                {
                                  headers: {
                                    'Authorization': `Bearer ${window.sessionStorage.getItem('userToken')}` 
                                  }
                                })
        .then((response) => {
          console.log("Successful create:", response);
          window.location.href = "/";
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      } else {
        api
        .post("/notes/send", { 
                                  "content": updatedText, "title": updatedTitle, "created" : new Date(),
                                  "sendTo": sendTo, "colour": colour
                                },
                                {
                                  headers: {
                                    'Authorization': `Bearer ${window.sessionStorage.getItem('userToken')}` 
                                  }
                                })
          .then((response) => {
            console.log("Successful create:", response);
            window.location.href = "/";
          })
          .catch((error) => {
            console.error("Error:", error);
          });      
      }
    } else {  //actualiza nota
      api
      .post("/notes/update", { "content": updatedText, "title": updatedTitle, "id": id},
                {
                  headers: {
                    'Authorization': `Bearer ${window.sessionStorage.getItem('userToken')}` 
                  }
                }
            )
      .then((response) => {
        console.log("Successful update:", response);
        window.location.href = "/";
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    }
  };

  const handleDelete = (event) => {
    //event.preventDefault();
    api
    .post(`/notes/delete`, {"id" : id},
              {
                headers: {
                  'Authorization': `Bearer ${window.sessionStorage.getItem('userToken')}` 
                }
              }
          )
    .then((response) => {
      console.log("Successful delete:", response);
      window.location.href = "/";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
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
      <div>
        
      </div>
      <button className="sendButton" type="submit">{id ? 'Guardar' : 'Crear'}</button>
    </form>
  );
}

export default noteForm;
