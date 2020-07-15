import React from "react";
import {Button, Modal} from 'react-bootstrap';
import propTypes from 'prop-types';

const Alert = props => {        
    const clickEvent = () => {
        if(props.handleClose){
            props.handleClose();
        }
        if(props.showRegisterModal){
            props.showRegisterModal();
        }        
    }

    const handleClose = () => {
        if(props.handleClose){
            props.handleClose();
        }
    }

    const showModal = props.showModal ? props.showModal : false;

    return(
        <Modal show={showModal} onHide={handleClose} animation={false} data-test="alert">            
                <Modal.Header closeButton >
                    <Modal.Title>Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h3>User with this username already exists</h3><br/>  
                    <h3>Please, try again </h3>                   
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-primary" type="submit" onClick={ clickEvent } >
                        Ok
                    </Button>
                </Modal.Footer>            
        </Modal> 
    );
}

Alert.propTypes = {
    show: propTypes.bool,
    handleClose: propTypes.func,
    showRegisterModal: propTypes.func
};

export default Alert;