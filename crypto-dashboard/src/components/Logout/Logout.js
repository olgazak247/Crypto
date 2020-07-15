import React from 'react';
import {Modal, Button} from 'react-bootstrap';

const Logout = props => {
    return (        
        <Modal show={props.showLogout} onHide={props.handleClose}  animation={false} id='mdLogout' size='sm'>            
            <Modal.Header >
                <Modal.Title><Button variant="outline-dark" onClick={props.handlerLogout} >Log out</Button></Modal.Title>
            </Modal.Header>                           
        </Modal>         
    );
}

export default Logout;