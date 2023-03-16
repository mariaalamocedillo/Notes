import React, { useState, useEffect } from 'react';
import 'react-edit-text/dist/index.css';
import { Col } from 'react-bootstrap';
import Select from 'react-select';
import api from '../../api/axiosConfig';

const SendingInfo = ({handleColorChange, handleUserChange}) => {
    const [users, setUsers] = useState([]);

    const [colors, setColors] = useState([
      { value: 'pink-note-palette', label: 'Pink' },
      { value: 'green-note-palette', label: 'Green' },
      { value: 'blue-note-palette', label: 'Blue' },
      { value: 'purple-note-palette', label: 'Purple' }
    ]);
  
    const getUsers = async () => {
      try {
        const response = await api.post('/auth/getAllUsers', {}, {
          headers: {
            Authorization: `Bearer ${window.sessionStorage.getItem('userToken')}`,
          },
        });
        response.data.push({ value: response.data[Math.floor(Math.random() * response.data.length)].value, label: 'Random user' })
        setUsers(response.data);
      } catch (err) {
        console.log(err);
      }
    };
  
    useEffect(() => {
      getUsers();
      if(colors.find(color => color.label === 'Random color') == undefined) {
        colors.push({ value: colors[Math.floor(Math.random() * colors.length)].value, label: 'Random color' });
      }
      handleUserChange(users[users.length - 1]);
      handleColorChange(colors[colors.length - 1]);
    }, []);
    
    return(
        <>
          <Col className="select-color">
            <Select options={colors} placeholder="Random color" onChange={handleColorChange} />
          </Col>
          <Col className="select-user">
            <Select options={users} placeholder="Random user" onChange={handleUserChange} />
          </Col>
      </>
    )
}

export default SendingInfo