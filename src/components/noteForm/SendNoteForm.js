import React, { useState } from "react";
import { EditText } from 'react-edit-text';
import api from '../../api/axiosConfig';
import { Row, Col } from 'react-bootstrap';
import SendingInfo from './SendingInfo';

const sendNoteForm = ({ defaultText, defaultTitle }) => {
  const [text, setText] = useState(defaultText);
  const [title, setTitle] = useState(defaultTitle);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);


  const handleUserChange = (selectedUser) => {
    setSelectedUser(selectedUser);
    console.log(selectedUser);
  };

  const handleColorChange = (selectedOption) => {
    console.log(selectedOption.value);
    setSelectedColor(selectedOption.value);
  };

  const handleTextChange = val => {
    setText(val.target.value);
  };

  const handleTitleChange = val => {
    setTitle(val.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if(selectedUser == undefined) {
      setSelectedUser();
    }
      api.post('/notes/create', { content: text, title: title, sendTo: selectedUser.value, colour: selectedColor }, {
        headers: {
          Authorization: `Bearer ${window.sessionStorage.getItem('userToken')}`
        }
      }).then(() => {
        //window.location.href = '/';
        alert("The note was sent!")
      }).catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <form onSubmit={(event) => handleSubmit(event, text, title)} className="sending-form">
      <Row className="inputs-txt">
        <h2>
          <EditText defaultValue={title} onSave={handleTitleChange} />
        </h2>
        <div className="noteContent">
          <textarea className="content-textarea" value={text} onChange={handleTextChange} rows={2} wrap={'soft'} cols={50}/>
        </div>
      </Row>
      <Row className="selects-row">
        <SendingInfo handleUserChange={handleUserChange} handleColorChange={handleColorChange}/>
        <Col className="button">
          <button className="sendButton" type="submit">
            Send
          </button>
        </Col>
      </Row>
    </form>
  );
};

export default sendNoteForm;
