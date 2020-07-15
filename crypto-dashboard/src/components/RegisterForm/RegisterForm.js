import React from "react";
import {Modal, Form, Button} from 'react-bootstrap';

 
const RegisterForm = props => {               
    let mystyle={};
    
    
    
    
    return  (     
                      
        <Modal show={props.show} onHide={props.handleClose} animation={false}>
            <Form noValidate validated={props.validated} onSubmit={props.handlerSubmit}>
                <Modal.Header closeButton >
                    <Modal.Title>Register</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" value={props.username} onChange={props.handlerSetUsername} required autoComplete="off"/>
                        <Form.Control.Feedback type="invalid">
                            Please choose an username.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword" >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={props.password} onChange={props.handlerSetPassword} required autoComplete="off"></Form.Control>
                        <Form.Control.Feedback type="invalid">
                            Please choose a password.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formBasicConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password" style={mystyle} isValid={props.confirmPassword != null && !props.isInvalidConfirmPassword} isInvalid={props.isInvalidConfirmPassword} value={props.confirmPassword} autoComplete="off" onChange={props.handlerSetConfirmPassword} ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                            Passwords do not match.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-primary" type="submit" >
                        Register
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>        
    );

}

export default RegisterForm;