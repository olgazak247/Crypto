import {shallow } from 'enzyme';
import React from 'react';
import {findByTestAttr, testStore} from './utils';
import App from './App';

const setUp = (initialState = {}) => {
    const store = testStore(initialState);
    const wrapper = shallow(<App store={store} />).childAt(0).dive();

    return  wrapper;
}

describe('App Componenet', () => {
    let wrapper;

    beforeEach(() => {        
        const initialState = {            
            currencies: [{title: "BTC-GBP", description: "Bitcoin", active: true}, {title: "BTC-EUR", description: "Bitcoin"}, {title: "BTC-USD", description: "Bitcoin"}, {title: "ETH-GBP", description: "Ethereum"}, {title: "ETH-EUR", description: "Ethereum"}, {title: "ETH-USD", description: "Ethereum"}, {title: "LTC-GBP", description: "Litecoin"}, {title: "LTC-EUR", description: "Litecoin"}, {title: "LTC-USD", description: "Litecoin"} ]            
        };

        wrapper = setUp(initialState);
    });

    it('Should render without errors', () => {
        const component = findByTestAttr(wrapper, 'AppComponent');
        expect(component.length).toBe(1);
    });

    it('handleShow Method should update state as expected', () => {
        const classInstance = wrapper.instance();
        classInstance.handleShow();
        const newState = classInstance.state.showModal;
        expect(newState).toBe(true);
    });

    it('updateSearch Method should update state search as expected', () => {
        const classInstance = wrapper.instance();
        const mockEvent = {
            target: {
              name: "change",
              value: "test"
            }
          };
        classInstance.updateSearch(mockEvent);
        const newState = classInstance.state.search;
        expect(newState).toBe('test');
    });

    it('setShow Method should update state as expected', () => {
        const classInstance = wrapper.instance();
        const myValue = true;
        classInstance.setShow(myValue);
        const newState = classInstance.state.showModal;
        expect(newState).toBe(myValue);
    });

    it('setShowRegister Method should update state as expected', () => {
        const classInstance = wrapper.instance();
        const myValue = false;
        classInstance.setShowRegister(myValue);
        const newState = classInstance.state.showModalRegister;
        expect(newState).toBe(myValue);
    });

    it('setShowLogout Method should update state as expected', () => {
        const classInstance = wrapper.instance();
        const myValue = true;
        classInstance.setShowLogout(myValue);
        const newState = classInstance.state.showLogout;
        expect(newState).toBe(myValue);
    });

    it('setShowAlert Method should update state as expected', () => {
        const classInstance = wrapper.instance();
        const myValue = false;
        classInstance.setShowAlert(myValue);
        const newState = classInstance.state.showModalAlert;
        expect(newState).toBe(myValue);
    });

    it('setValidatedLoginForm Method should update state as expected', () => {
        const classInstance = wrapper.instance();
        const form = false;
        classInstance.setValidatedLoginForm(form);
        const newState = classInstance.state.loginFormValidated;
        expect(newState).toBe(form);
    });

    it('setValidatedRegisterForm Method should update state as expected', () => {
        const classInstance = wrapper.instance();
        const form = true;
        classInstance.setValidatedRegisterForm(form);
        const newState = classInstance.state.registerFormValidated;
        expect(newState).toBe(form);
    });

    it('handleClose Method should update state as expected', () => {
        const classInstance = wrapper.instance();
        const username = '';
        const password = '';
        const showModal = false;
        classInstance.handleClose();
        const newStateUsername = classInstance.state.username;
        const newStatePassword = classInstance.state.password;
        const newStateShowModal = classInstance.state.showModal;
        expect(newStatePassword).toBe(password);
        expect(newStateUsername).toBe(username);
        expect(newStateShowModal).toBe(showModal);
    });

    it('handleShowAlert Method should update state as expected', () => {
        const classInstance = wrapper.instance();
        const showAlert = true;
        classInstance.handleShowAlert(showAlert);
        const newState = classInstance.state.showModalAlert;
        expect(newState).toBe(showAlert);
    });

    it('handleCloseAlert Method should update state as expected', () => {
        const classInstance = wrapper.instance();
        const showAlert = false;
        classInstance.handleCloseAlert(showAlert);
        const newState = classInstance.state.showModalAlert;
        expect(newState).toBe(showAlert);
    });

    it('handleShowRegister Method should update state as expected', () => {
        const classInstance = wrapper.instance();
        const showRegister = true;
        classInstance.handleShowRegister(showRegister);
        const newState = classInstance.state.showModalRegister;
        expect(newState).toBe(showRegister);
    });

    it('handleShowLogout Method should update state as expected', () => {
        const classInstance = wrapper.instance();
        const showLogout = true;
        classInstance.handleShowLogout(showLogout);
        const newState = classInstance.state.showLogout;
        expect(newState).toBe(showLogout);
    });

    it('handleCloseLogout Method should update state as expected', () => {
        const classInstance = wrapper.instance();
        const showLogout = false;
        classInstance.handleCloseLogout(showLogout);
        const newState = classInstance.state.showLogout;
        expect(newState).toBe(showLogout);
    });

    it('handleCloseRegister Method should update state as expected', () => {
        const classInstance = wrapper.instance();
        const showRegister = false;
        classInstance.handleCloseRegister(showRegister);
        const newState = classInstance.state.showModalRegister;
        expect(newState).toBe(showRegister);
    });

    it('setUsername Method should update state username as expected', () => {
        const classInstance = wrapper.instance();
        const mockEvent = {
            target: {
              name: "change",
              value: "test"
            }
          };
        classInstance.setUsername(mockEvent);
        const newState = classInstance.state.username;
        expect(newState).toBe('test');
    });

    it('setPassword Method should update state password as expected', () => {
        const classInstance = wrapper.instance();
        const mockEvent = {
            target: {
              name: "change",
              value: "test"
            }
          };
        classInstance.setPassword(mockEvent);
        const newState = classInstance.state.password;
        expect(newState).toBe('test');
    });

    it('handlerSetConfirmPassword Method should update state confirmPassword as expected', () => {
        const classInstance = wrapper.instance();
        const mockEvent = {
            target: {
            name: "change",
            value: "test"
            }
        };        
        classInstance.handlerSetConfirmPassword(mockEvent);
        const newState = classInstance.state.confirmPassword;
        const newStateIsInvalidConfirmPassword = classInstance.state.isInvalidConfirmPassword;
        expect(newState).toBe('test');
        expect(newStateIsInvalidConfirmPassword).toBe(true);
    });

    it('onNotifReceived Method should update state lstCurrency as expected', () => {
        const classInstance = wrapper.instance();
        const messages =['{"product_id": "BTC-GBP", "price": "7654.08", "best_bid": 7654.08, "best_ask": 7654}', '{"product_id": "BTC-EUR", "price": "7654.08", "best_bid": 7654.08, "best_ask": 7654}'];        
        classInstance.onNotifReceived(messages);
        const newState = classInstance.state.lstCurrency;  
        const newStateExpected =  [{"active": true, "ask": 7654, "bid": 7654.08, "currency": undefined, "description": "Bitcoin", "price": "7654.08", "title": "BTC-GBP"}, {"active": undefined, "ask": 7654, "bid": 7654.08, "currency": undefined, "description": "Bitcoin", "price": "7654.08", "title": "BTC-EUR"}, {"description": "Bitcoin", "title": "BTC-USD"}, {"description": "Ethereum", "title": "ETH-GBP"}, {"description": "Ethereum", "title": "ETH-EUR"}, {"description": "Ethereum", "title": "ETH-USD"}, {"description": "Litecoin", "title": "LTC-GBP"}, {"description": "Litecoin", "title": "LTC-EUR"}, {"description": "Litecoin", "title": "LTC-USD"}];
        expect(newState).toStrictEqual(newStateExpected);
    });

    it('drawerToggleClickHandler Method should update state as expected', () => {
        const classInstance = wrapper.instance();
        const sideDrawerOpen = false;
        classInstance.drawerToggleClickHandler();
        const newState = classInstance.state.sideDrawerOpen;
        expect(newState).toBe(sideDrawerOpen);
    });

    it('handlerClick Method should update state as expected', () => {
        const classInstance = wrapper.instance();
        const item = {active: false, ask: 8618.12, bid: 8615.09, currency: "€", description: "Bitcoin", difference: null, price: "8615.09", title: "BTC-EUR"};
        classInstance.handlerClick(item);
        const expectedItem = {"active": true, "description": "Bitcoin", "title": "BTC-EUR", "ask": 8618.12, "bid": 8615.09, "currency": "€","difference": null, "price": "8615.09"};
        const newState = classInstance.state.currentItem;
        expect(newState).toStrictEqual(expectedItem);
    });

    it('handleSubmit Method should update state as expected', () => {
        const classInstance = wrapper.instance();    
        const mockEvent = {
            preventDefault: jest.fn(),
            currentTarget: {
            username: "change",
            password: "test",
            checkValidity: () => true            
            }            
        };    
        classInstance.handleSubmit(mockEvent);        
        const newStateUsername = classInstance.state.username;
        const newStatePassword = classInstance.state.password;
        expect(newStateUsername).toStrictEqual("");
        expect(newStatePassword).toStrictEqual("");
    });

    it('manageGetUser Method should update state as expected', () => {
        const classInstance = wrapper.instance();               
        classInstance.manageGetUser();        
        const newStateUsername = classInstance.state.username;
        const newStatePassword = classInstance.state.password;
        expect(newStateUsername).toStrictEqual("");
        expect(newStatePassword).toStrictEqual("");
    });

    // it('manageGetUser Method should update state as expected', () => {
    //     const classInstance = wrapper.instance();               
    //     classInstance.manageGetUser();        
    //     const newStateUsername = classInstance.state.username;
    //     const newStatePassword = classInstance.state.password;
    //     expect(newStateUsername).toStrictEqual("");
    //     expect(newStatePassword).toStrictEqual("");
    // });
});
