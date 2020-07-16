import {types} from './types';
import axios from 'axios';

export const fetchCurrencies = () => async (dispatch) => {
    await axios.get('https://localhost:44364/api/currency')
    .then(res => {
        dispatch({
            type: types.GET_CURRENCIES,
            payload: res.data
        })
    })
    .catch(err => {});
};

export const fetchMessages = () => async (dispatch) => {
    await axios.get('https://localhost:44364/api/Messages')
    .then(res => {
        dispatch({
            type: types.GET_MESSAGES,            
        })
    })
    .catch(err => {});
};

export const fetchGetUser = (user) => async (dispatch) => {
    const options = {
        headers: {'Content-Type': 'application/json'}
      };
    await axios.post('https://localhost:44364/api/user/getuser', JSON.stringify(user), options)
    .then(res => {
        dispatch({
            type: types.GET_USER,            
            payload: res.data
        })
    })
    .catch(err => {});     
}

export const fetchAddUser = (user) => async (dispatch) => {
    const options = {
        headers: {'Content-Type': 'application/json'}
      };
    await axios.post('https://localhost:44364/api/user/adduser', JSON.stringify(user), options)
    .then(res => {
        dispatch({
            type: types.ADD_USER,            
            payload: res.data
        })
    })
    .catch(err => {});     
}

// export const getSiganlR = () => async (dispatch) => {
//     const signalRConnection = new signalR.HubConnectionBuilder()      
//       .withUrl("https://localhost:44364/messageHub")    
//       .withAutomaticReconnect()
//       .configureLogging(signalR.LogLevel.Information)
//       .build();
      
//     signalRConnection.on('ReceiveTickerMessage', this.onNotifReceived);         
//     signalRConnection.start()
//       .then(() => console.info('SignalR Connected'))
//       .catch(err => console.error('SignalR Connection Error: ', err));
// }