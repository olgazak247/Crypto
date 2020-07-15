import SignalRService from './signalRController';

export default class MessageService{
    constructor(messageReceived){
        this._messageReceived = messageReceived;
        SignalRService.registerReceiveTickerEvent((msg) => {
            this._messageReceived(msg);
        });
    }    
}