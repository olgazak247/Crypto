import React from "react";
import {Modal, Form, Button} from 'react-bootstrap';
 
const LoginForm = props => {              
    return (        
        <Modal show={props.showModal} onHide={props.handleClose} animation={false}>
            <Form noValidate validated={props.validated} onSubmit={props.handlerSubmit}>
                <Modal.Header closeButton >
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="validationCustomUsername">
                        <Form.Label>Username</Form.Label>                        
                        <Form.Control type="text" placeholder="Enter username" value={props.username} onChange={props.handlerSetUsername} required autoComplete="off" />
                        <Form.Control.Feedback type="invalid">
                            Please enter an username.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword" >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={props.password} onChange={props.handlerSetPassword} required autoComplete="off"></Form.Control>
                        <Form.Control.Feedback type="invalid">
                            Please enter a password.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-primary" type="submit" >
                        Sign in
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>        
    );
}

export default LoginForm;