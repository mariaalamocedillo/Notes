import React, { useState } from "react";
import { EditText } from 'react-edit-text';
import api from '../../api/axiosConfig';

const noteForm = ({ defaultText, defaultTitle, defaultId }) => {
    const [text, setText] = useState(defaultText);
    const [title, setTitle] = useState(defaultTitle);
    const [id, setId] = useState(defaultId);

  const handleTextChange = val => {
    setText(val.value);
  };

  const handleTitleChange = val => {
    setTitle(val.value);
  }

  const handleSubmit = (event, updatedText, updatedTitle) => {
    event.preventDefault();
    api
      .post("/tasks/update", { "tasks": updatedText, "name": updatedTitle, "id": id })
      .then((response) => {
        console.log("Success:", response);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  

  return (
  <form onSubmit={(event) => handleSubmit(event, text, title)}>
      <h2>
        <EditText
          defaultValue={title}
          onSave={handleTitleChange}
        />
      </h2>
      <EditText
        defaultValue={text}
        onSave={handleTextChange}
      />
      <button type="submit">Enviar a API</button>
    </form>
  );
}

export default noteForm;
