import {combineReducers} from 'redux';
import currencies from './currencies/reducer';
import user from './user/reducer';
import messages from './messages/reducer';

export default combineReducers({ 
    currencies,
    messages,
    user    
});
