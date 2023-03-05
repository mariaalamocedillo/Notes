import React from 'react'
import { Container, Button, Link } from 'react-floating-action-button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const FloatButton = () => {  
    return (
        <Container>
            {/*<Link href="#"
                tooltip="Create note link"
                icon="far fa-sticky-note" 
                className="tooltip-color"
                />*/}
            <Link href={encodeURI('/login' + '?token_removed=true')}
                tooltip="Logout"
                className="fab-item btn btn-link btn-lg text-white tooltip-color"
                ><FontAwesomeIcon icon={faRightFromBracket} /></Link>
            <Button
                tooltip="Hi!"
                icon="fa-solid fa-right-from-bracket"
                rotate={true}
                className="tooltip-color"
                ><FontAwesomeIcon icon={faPlus} /></Button>
        </Container>
    )
}

export default FloatButton