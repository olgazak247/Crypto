import * as signalR from '@microsoft/signalr';

class SignalRController{
    constructor(props){
        this.signalRConnection = new signalR.HubConnectionBuilder()      
            .withUrl("https://localhost:44364/messageHub")    
            .withAutomaticReconnect()
            .configureLogging(signalR.LogLevel.Information)
            .build();

        this.signalRConnection.start()
            .then(() => console.info('SignalR Connected'))
            .catch(err => console.error('SignalR Connection Error: ', err));  
    }

    registerReceiveTickerEvent = (callback) => {
        this.signalRConnection.on('ReceiveTickerMessage', function(message){
            console.log(message);
            callback(message);
        });
    }

    // registerReceiveSnapshotEvent = (callback) => {
    //     this.signalRConnection.on('ReceiveSnapshotMessage', function(message){
    //         console.log(message);
    //         callback(message);
    //     });
    // }

    // registerReceiveL2Event = (callback) => {
    //     this.signalRConnection.on('ReceiveL2Message', function(message){
    //         console.log(message);
    //         callback(message);
    //     });
    // }
}

const SignalRService = new SignalRController();
export default SignalRService;