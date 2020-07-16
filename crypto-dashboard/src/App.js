import React, {Component} from 'react';
import Toolbar from './components/Toolbar/Toolbar';
import SideDrawer from './components/SideDrawer/SideDrawer';
import Backdrop from './components/Backdrop/Backdrop';
import LoginForm from './components/LoginForm/LoginForm';
import Logout from './components/Logout/Logout';
import RegisterForm from './components/RegisterForm/RegisterForm';
import Alert from './components/AlertModal/AlertModal';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as signalR from '@microsoft/signalr';
import {connect} from 'react-redux';
import {fetchCurrencies, fetchMessages, fetchGetUser, fetchAddUser} from './actions';

const initialState = {
  username:'',
  password:'',
  confirmPassword: '',
  showModal: false,
  showModalRegister: false,
  showLogout: false,
  sideDrawerOpen: true,
  lstCurrency: [{title: "BTC-GBP", description: "Bitcoin", active: true}, {title: "BTC-EUR", description: "Bitcoin"}, {title: "BTC-USD", description: "Bitcoin"}, {title: "ETH-GBP", description: "Ethereum"}, {title: "ETH-EUR", description: "Ethereum"}, {title: "ETH-USD", description: "Ethereum"}, {title: "LTC-GBP", description: "Litecoin"}, {title: "LTC-EUR", description: "Litecoin"}, {title: "LTC-USD", description: "Litecoin"} ],   
  currentItem: {}, 
  search: '',
  loginFormValidated: false,
  registerFormValidated: false,
  isInvalidConfirmPassword: false,
  showModalAlert: false,
  snapshots: [{product_id: "BTC-GBP", active: true, bidOrder: [], askOrder: []}, {product_id: "BTC-EUR", bidOrder: [], askOrder: []}, {product_id: "BTC-USD", bidOrder: [], askOrder: []}, {product_id: "ETH-GBP", bidOrder: [], askOrder: []}, {product_id: "ETH-EUR", bidOrder: [], askOrder: []}, {product_id: "ETH-USD", bidOrder: [], askOrder: []}, {product_id: "LTC-GBP", bidOrder: [], askOrder: []}, {product_id: "LTC-EUR", bidOrder: [], askOrder: []}, {product_id: "LTC-USD", bidOrder: [], askOrder: []}],
  currentAsks: [],
  currentBids: [],
  prices: [{title: "BTC-GBP", pricesChart: []}, {title: "BTC-EUR", pricesChart: []}, {title: "BTC-USD", pricesChart: []}, {title: "ETH-GBP", pricesChart: []}, {title: "ETH-EUR", pricesChart: []}, {title: "ETH-USD", pricesChart: []}, {title: "LTC-GBP", pricesChart: []}, {title: "LTC-EUR", pricesChart: []}, {title: "LTC-USD", pricesChart: []}],
};

class App extends Component {
  constructor(props){    
    super(props); 

    this.state = {
      ...initialState
    }    
  }
  
  fetch = () => {
    this.props.fetchCurrencies();          
  }
      
  setShow = (mod) => {
    this.setState({showModal: mod});
  }

  setShowRegister  = (mod) => {
    this.setState({showModalRegister: mod});
  }

  setShowLogout = (mod) => {
    this.setState({showLogout: mod});
  }

  setShowAlert = (mod) => {
    this.setState({showModalAlert: mod});
  }

  setValidatedLoginForm = (form) => {
    this.setState({loginFormValidated: form})
  }

  setValidatedRegisterForm = (form) => {
    this.setState({registerFormValidated: form})
  }

  handleShow = () => {
    this.setShow(true);
  }

  handleClose = () => {
    if((this.state.username != null && this.state.username.length === 0) || (this.state.password != null && this.state.password.length === 0))  {
      this.setState({username: '', password: ''});      
    }
    this.setShow(false);
  }

  handleShowAlert = () => {
    this.setShowAlert(true);
  }

  handleCloseAlert = () => {
    this.setShowAlert(false);
  }

  handleShowRegister =() => {
    this.setShowRegister(true);
  }

  handleShowLogout = () => {
    this.setShowLogout(true);
  }

  handleCloseLogout = () => {
    this.setShowLogout(false);
  }

  handleCloseRegister = () => {
    if((this.state.username != null && this.state.username.length === 0) || (this.state.password != null && this.state.password.length === 0) || (this.state.confirmPassword != null && this.state.confirmPassword.length === 0))  {
      this.setState({username: ''});
      this.setState({password: ''});
      this.setState({confirmPassword: ''});
      this.setState({isInvalidConfirmPassword: true});
    }
    this.setShowRegister(false);
  }

  setUsername = (e) => {
    this.setState({username: e.target.value});
  }

  setPassword = (e) => {
    this.setState({password: e.target.value});
  }

  handlerSetConfirmPassword = (e) => {
    this.setState({confirmPassword: e.target.value});
    if(this.state.confirmPassword !== this.state.password){
      this.setState({isInvalidConfirmPassword: true});
    }else{
      this.setState({isInvalidConfirmPassword: false});
    }
  }
  
  onNotifReceived = (message) => {            
    let jMessage = JSON.parse(message);
    let lstCurrency = this.state.lstCurrency;    
    for(var i = 0; i < lstCurrency.length; i++){
      if (lstCurrency[i] !== null && lstCurrency[i].title === jMessage.product_id){
        let currency = {}; 
        currency.spPrices = lstCurrency[i].spPrices;
        let prevPrice = this.state.prices.find(p => p.title === jMessage.product_id);        
        let price = prevPrice;              
        currency.title = jMessage.product_id;        
        currency.price = this.numberWithCommas(parseFloat(jMessage.price).toFixed(2));
        if(currency.spPrices == null){
          let spPrices = [];
          currency.spPrices = spPrices;
        }
        currency.spPrices.push(parseFloat(jMessage.price));
        if(currency.spPrices.length > 5){
          currency.spPrices.shift();
        }
        price.pricesChart.push([jMessage.time, jMessage.price, jMessage.volume_24h]);        
        currency.volume = this.numberWithCommas(parseFloat(jMessage.volume_24h).toFixed(3));
        currency.description = lstCurrency[i].description;
        currency.active = lstCurrency[i].active;
        price.active = lstCurrency[i].active;        
        currency.currency = lstCurrency[i].currency;
        currency.open = lstCurrency[i].open;        
        let differencePrice = ((parseFloat(jMessage.price) - parseFloat(currency.open)) / parseFloat(currency.open)) * 100;
        if(differencePrice >= 0){
          currency.difference = "+" + differencePrice.toFixed(2) + "%";
        }else{
          currency.difference = differencePrice.toFixed(2) + "%";
        }         
        this.setState(lstCurrency[i] = currency);
        if(currency.active){
          this.setState({currentItem: lstCurrency[i]});
        }
        this.setState(prevPrice = price);        
      }
    }              
  } 
      
  connectToHub = () => {    
    const signalRConnection = new signalR.HubConnectionBuilder()      
      .withUrl("https://localhost:44364/messageHub")    
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();
      
    signalRConnection.on('ReceiveTickerMessage', this.onNotifReceived);         
    signalRConnection.start()
      .then(() => console.info('SignalR Connected'))
      .catch(err => console.error('SignalR Connection Error: ', err));                      
  }
  
  getMessages = () => { 
    this.props.fetchMessages();     
  }  
  
  componentDidMount = () => {
    this.fetch();               
    this.connectToHub();                   
  };

  componentDidUpdate = (prevProps, prevState) => {                              
    if(this.props.lstCurrency.length > 0 && prevProps.lstCurrency !== this.props.lstCurrency){
      this.getCurrencies();
    }
    this.getMessages();    
  }

  numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  getCurrencies = () => {            
    let currencies = this.props.lstCurrency;
    for(var i = 0; i < currencies.length; i++){
      let price = parseFloat(currencies[i].price).toFixed(2);
      let volume = parseFloat(currencies[i].volume).toFixed(3);
      currencies[i].price = this.numberWithCommas(price);
      currencies[i].volume = this.numberWithCommas(volume);
      let spPrices = [price];          
      currencies[i].spPrices = spPrices;
    }
    let active = this.props.lstCurrency.find(item => item.active);
    this.setState({lstCurrency: this.props.lstCurrency, currentItem: active != null ? active : null});  
    let prices = this.state.prices;
    for(var y = 0; y < prices.length; y++){
      let currencies = this.state.lstCurrency;
      let price = prices[y];
      let currency = currencies.find(c => c.title === price.title);  
      if(currency != null){
        const itemChart = [currency.date, currency.price, currency.volume];
        price.pricesChart.push(itemChart); 
        price.active = currency.active; 
      } 
      this.setState(prices[y] = price);           
    }              
  }
      
  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return {
        sideDrawerOpen: !prevState.sideDrawerOpen
      }
    });
  }
  
  handlerClick = (item) => {
    item.active = true;    
    let prevLst = this.state.lstCurrency;
    let prevPrices = this.state.prices;
    
    for(let i = 0; i < prevLst.length; i++){
      prevLst[i].active = false;
      if(prevLst[i].title === item.title){
        prevLst[i].active = true;        
      }
    }
    this.setState({currentItem: item}); 

    for(let i = 0; i < prevPrices.length; i++){
      prevPrices[i].active = false;
      if(prevPrices[i].title === item.title){
        prevPrices[i].active = true;
      }
    }    
  }
      
  handleSubmit = (event) => {   
    event.preventDefault();     
    const form = event.currentTarget;
    if (form.checkValidity() === false) {            
      event.stopPropagation(); 
      this.setState({username: ''});
      this.setState({password: ''});     
    } 
    this.setValidatedLoginForm(true);  
    if(form.checkValidity() === true){           
      let user = {Username: this.state.username, Password: this.state.password};  
      this.props.fetchGetUser(user);                              
      setTimeout(() => {
        this.manageGetUser();
      }, 2000);      
    }        
  }

  manageGetUser = () => {
    try {
      let res = this.props.user;
      if (res != null && res.username != null && res.password != null) {
        this.handleClose(); 
        this.setState({username: res.username});
        this.setState({password: res.password});                   
      } else{
        this.setState({username: ''});
        this.setState({password: ''}); 
      }
    }catch(e){ 
        console.log(e); 
        this.handleClose();  
        this.setState({username: ''});
        this.setState({password: ''});
    }
  }

  handleRegisterSubmit= (event) => {   
    event.preventDefault();     
    const form = event.currentTarget;
    if (form.checkValidity() === false || (this.state.password !== null && this.state.confirmPassword !== null && this.state.password !== this.state.confirmPassword)) {            
      event.stopPropagation();   
      this.setState({username: ''});
      this.setState({password: ''});
      this.setState({confirmPassword: ''});
      this.setState({isInvalidConfirmPassword: true});
      form.isValid = false;
    }     
    this.setValidatedRegisterForm(true);          
    if (form.checkValidity() === true && this.state.password != null && this.state.confirmPassword != null && this.state.password === this.state.confirmPassword){
      let user = {Username: this.state.username, Password: this.state.password};     
      this.props.fetchAddUser(user);                              
      setTimeout(() => {
        this.manageAddUser();
      }, 2000);                
      
    }        
  }

  manageAddUser = () => {
    try { 
      let res = this.props.user;      
      this.handleCloseRegister();                                                        
      if (res != null && res.username != null && res.password != null) {                               
        this.setState({username: res.username});
        this.setState({password: res.password});                   
      } else{                
        this.handleShowAlert();
        this.setState({username: ''});
        this.setState({password: ''}); 
        this.setState({confirmPassword: ''}); 
      }             
    }catch(e){ 
        console.log(e); 
        this.handleCloseRegister();  
        this.setState({username: ''});
        this.setState({password: ''});
        this.setState({confirmPassword: ''});
    }
  }

  handlerLogout= () => {
    this.handleCloseLogout();
    this.setState({username: ''});
    this.setState({password: ''});
  }

  updateSearch = (event) => {
    this.setState({search: event.target.value.substr(0,20)});
  }

  render = () => {         
    const configBackdrop = {
      show: this.state.sideDrawerOpen,
      content: this.state.currentItem,
      priceChart: this.state.prices.find(p => p.active)      
    }
    
    const configToolbar = {
      drawerClickHandler: this.drawerToggleClickHandler,
      username: this.state.username,
      handleShow: this.handleShow,
      handleShowRegister: this.handleShowRegister,
      handleShowLogout: this.handleShowLogout
    }

    const configSideDrawer = {
      show: this.state.sideDrawerOpen,
      lstCurrency: this.state.lstCurrency,
      priceSpChart: this.state.prices,
      click: this.handlerClick,
      search: this.state.search,
      handlerSearch: this.updateSearch
    }

    const configLogin = {
      validated: this.state.loginFormValidated,
      showModal: this.state.showModal,
      handleClose: this.handleClose,
      username: this.state.username,
      password: this.state.password,
      handlerSetPassword: this.setPassword,
      handlerSetUsername: this.setUsername,
      handlerSubmit: this.handleSubmit,      
    }

    const configLogout = {
      showLogout: this.state.showLogout,
      handleClose: this.handleCloseLogout,
      handlerLogout: this.handlerLogout
    }

    const configRegister = {
      validated: this.state.registerFormValidated,
      show: this.state.showModalRegister,
      handleClose: this.handleCloseRegister,
      username: this.state.username,
      password: this.state.password,
      handlerSetPassword: this.setPassword,
      handlerSetUsername: this.setUsername,
      handlerSetConfirmPassword: this.handlerSetConfirmPassword,
      isInvalidConfirmPassword: this.state.isInvalidConfirmPassword,
      handlerSubmit: this.handleRegisterSubmit
    }

    const configAlert = {
      showModal: this.state.showModalAlert,
      handleClose: this.handleCloseAlert,
      showRegisterModal: this.handleShowRegister
    }

    return (
      <div style={{height: '100%'}} data-test="AppComponent">  
        <Toolbar {...configToolbar} />          
        <SideDrawer {...configSideDrawer} />                             
        <Backdrop {...configBackdrop}></Backdrop>   
        <LoginForm {...configLogin}/>                          
        <Logout {...configLogout}/>
        <RegisterForm {...configRegister}/>
        <Alert {...configAlert}></Alert>
      </div>
    ); 
     
  }  
}

const mapStateToProps = state => {    
  return {
    lstCurrency: state.currencies,
    messages: state.messages,
    user: state.user         
  }  
}

export default connect(mapStateToProps, { fetchCurrencies, fetchMessages, fetchGetUser, fetchAddUser })(App);


