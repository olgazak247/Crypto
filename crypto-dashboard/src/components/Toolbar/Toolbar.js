import React from 'react';
import './Toolbar.css';
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import {Button} from 'react-bootstrap';
import PropTypes from 'prop-types';

const Toolbar = props =>{        
    let user;        
    if(props.username === ''){
        user = (
            <div style={{display: "flex"}} > 
                <Button variant="link" size="sm" style={{color: "white", width: "10%"}} onClick={props.handleShowRegister}>Sign up</Button>
                <Button variant="outline-light" size="sm" onClick={props.handleShow} data-test='notUsername'>Sign in</Button>
            </div>
        );        
    }else{
        user = (            
            <div>                  
                <Button variant="outline-light" size="sm" onClick={props.handleShowLogout} ><b data-test="username">Hi, {props.username}</b></Button>                      
            </div>
          );
    }

    return (    
        <header className='toolbar' data-test='toolbar'>        
            <nav className='toolbar__navigation'>
                <div className='toolbar__toggle-button' data-test='toolbar__toggle-button'> 
                    <DrawerToggleButton click={props.drawerClickHandler}/>
                </div>            
                <div className='toolbar__title'><b>Crypto Dashboard</b></div>
                <div className='spacer'></div> 
                {user}                          
            </nav>
        </header>                 
    )
};

Toolbar.propTypes = {
    username: PropTypes.string
}

export default Toolbar;