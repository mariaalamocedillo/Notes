import React, { useState, useEffect } from "react";
import { EditText } from 'react-edit-text';
import api from '../../api/axiosConfig';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';

const sendNoteForm = ({ defaultText, defaultTitle, defaultId }) => {
  const [text, setText] = useState(defaultText);
  const [title, setTitle] = useState(defaultTitle);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  
  const colors = [
    { value: 'pink-note-palette', label: 'Pink' },
    { value: 'green-note-palette', label: 'Green' },
    { value: 'blue-note-palette', label: 'Blue' },
    { value: 'purple-note-palette', label: 'Purple' }
  ];

  const getUsers = async () => {
    try {
      const response = await api.post('/auth/getAllUsers', {}, {
        headers: {
          Authorization: `Bearer ${window.sessionStorage.getItem('userToken')}`,
        },
      });
      setUsers(response.data);
    } catch (err) {
      console.log("Can't access to the list of users");
      console.log(err);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleUserChange = (selectedOption) => {
    setSelectedUser(selectedOption.value);
  };

  const handleColorChange = (selectedOption) => {
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
    console.log(selectedColor);
      api.post('/notes/create', { content: text, title: title, sendTo: selectedUser, colour: selectedColor }, {
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
          <Col className="select-color">
            <Select options={colors} placeholder="Color" onChange={handleColorChange} />
          </Col>
          <Col className="select-user">
            <Select options={users} placeholder="Send to" onChange={handleUserChange} />
          </Col>
          <Col className="button">
          </Col>
            <button className="sendButton send-note-btn" type="submit">
              Send
            </button>
      </Row>
    </form>
  );
};

export default sendNoteForm;
