import React, { useState, useEffect } from 'react';
import 'react-edit-text/dist/index.css';
import {Container, Row, Col} from 'react-bootstrap';
import Select from 'react-select';
import api from '../../api/axiosConfig';

const SendingInfo = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
  
    const colors = [
      { value: 'red', label: 'Red' },
      { value: 'green', label: 'Green' },
      { value: 'blue', label: 'Blue' },
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
        console.log(err);
      }
    };
  
    useEffect(() => {
      getUsers();
    }, []);
  
    const handleUserChange = (selectedOption) => {
      setSelectedUser(selectedOption);
    };
  
    const handleColorChange = (selectedOption) => {
      setSelectedColor(selectedOption);
    };
  
    const handleSendNote = () => {
      if (selectedUser && selectedColor) {
        NoteForm.sendNote({
          user: selectedUser,
          color: selectedColor,
        });
      }
    };
  
    const getData = () => {
        console.log("EN el getData");
        return "selectedColor";
    };
    
    return(
        <>
        <Row className="selects-row">
          <Col className="select-color">
            <Select options={colors} placeholder="Choose color" onChange={handleColorChange} />
          </Col>
          <Col className="select-user">
            <Select options={users} placeholder="Choose user to send it to" onChange={handleUserChange} />
          </Col>
          <Col className="button">
            <button className="sendButton" type="submit" onClick={handleSendNote}>
              Send
            </button>
          </Col>
        </Row>
      </>
    )
}

export default SendingInfo