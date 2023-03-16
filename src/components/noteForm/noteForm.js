import { useState, useCallback } from "react";
import api from '../../api/axiosConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { Row, Col } from 'react-bootstrap';
import sanitizeHtml from "sanitize-html"
import ContentEditable from 'react-contenteditable';
import SendingInfo from './SendingInfo';

const NoteForm = ({ sendNote, editable, defaultText = '', defaultTitle = '', defaultId = null, onFetch }) => {
  const [text, setText] = useState(defaultText);
  const [title, setTitle] = useState(defaultTitle);
  const [id, setId] = useState(defaultId);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

	const onContentChange = useCallback(evt => {
		const sanitizeConf = {
			allowedTags: ["b", "i", "a", "p"],
			allowedAttributes: { a: ["href"] }
		};

		setTitle(sanitizeHtml(evt.currentTarget.innerHTML, sanitizeConf))
	}, [])


  const handleTextChange = (event) => {
    setText(event.target.value);
  };


  const handleUserChange = (selectedUser) => {
    setSelectedUser(selectedUser);
    console.log(selectedUser);
  };

  const handleColorChange = (selectedOption) => {
    console.log(selectedOption.value);
    setSelectedColor(selectedOption.value);
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    const endpoint = id ? '/notes/update' : '/notes/create';
    const data = sendNote ? { content: text.trim(), title: title.trim(), 
              sendTo: selectedUser.value, colour: selectedColor }
            : { content: text.trim(), title: title.trim(), id };
    console.log(data);
    const options = {
      headers: {
        Authorization: `Bearer ${window.sessionStorage.getItem('userToken')}`,
      },
    };
    api.post(endpoint, data, options)
      .then((response) => {
        console.log('Successful create/update:', response);
        sendNote && alert('The note was successfully sent!');
        onFetch();
      })
      .catch((error) => {
        handleError(error);
      });
  };

  const handleDelete = (event) => {
    event.preventDefault();
    api.post('/notes/delete', { id }, {
      headers: {
        Authorization: `Bearer ${window.sessionStorage.getItem('userToken')}`,
      },
    })
      .then((response) => {
        console.log('Successful delete:', response);
        onFetch();
      })
      .catch((error) => {
        handleError(error);
      });
  };

  const handleError = (error) => {
    console.log(error);
    if (error.response && error.response.status === 401) {
      // The user is not logged in; must delete the token
      window.sessionStorage.removeItem('userToken');
      window.location.href = '/login';
    } else {
      // Some other error occurred
      setError('An error occurred while processing your request. Please try again later.');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Row className="inputs-txt">
        {id && (
          <button className="deleteButton" onClick={handleDelete}>
            <FontAwesomeIcon className="deleteIcon" icon={faTrashCan} />
          </button>
        )}
        <h2 className="editable-title">
            <ContentEditable
              onChange={onContentChange}
              onBlur={onContentChange}
              disabled={!editable}
              html={title}/>
        </h2>

        <div className="noteContent">        
          { editable ? 
              <textarea
              className="content-textarea"
              value={text}
              onChange={handleTextChange}
              rows={id ? 5 : 2}
              wrap="soft"
              cols={40}
              />
            : text}
        </div>
      </Row>
      <Row className={(editable && !sendNote && !id) ? "selects-row pos-abs" : "selects-row"}>

      { sendNote &&
        <>
          <SendingInfo handleUserChange={handleUserChange} handleColorChange={handleColorChange}/>
          <div className="end-btn">
            <button className="sendButton" type="submit">
              Send
            </button>
          </div>
        </>
      }
      { (editable && !sendNote) && 
      <div className="end-btn">
        <button className="sendButton" type="submit">
          {id ? 'Save' : 'Create'}
        </button>
      </div>
      }
      </Row>

    </form>
  );
};

export default NoteForm;
