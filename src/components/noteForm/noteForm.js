import React, { useState } from "react";
import { EditText } from 'react-edit-text';
import api from '../../api/axiosConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

const noteForm = ({ defaultText, defaultTitle, defaultId }) => {
    const [text, setText] = useState(defaultText);
    const [title, setTitle] = useState(defaultTitle);
    const [id, setId] = useState(defaultId);

  const handleTextChange = val => {
    setText(val.target.value);
    //val.target.form.requestSubmit();
  };

  const handleTitleChange = val => {
    setTitle(val.value);
  }

  const handleSubmit = (event, updatedText, updatedTitle) => {
    event.preventDefault();
    if (id == null || id == undefined){ //sin id = nueva nota
        api
        .post("/notes/create", { 
                                  "content": updatedText, "title": updatedTitle
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
        <textarea className="content-textarea" value={text} onChange={handleTextChange} rows={id ? 5 : 2} wrap={'soft'} cols={40} />
      </div>
      <div>
        <button className="sendButton" type="submit">{id ? 'Save' : 'Create'}</button>
      </div>
  </form>
  );
}

export default noteForm;
