import React from 'react';
import {shallow} from 'enzyme';
import Toolbar from './Toolbar';
import {findByTestAttr, checkProps} from './../../utils/index';


const setUp = (props={}) => {
    const component = shallow(<Toolbar { ...props }/>);
    return component;
};

describe('Toolbar Component', () => {
    let component;
    beforeEach( () => {
         component = setUp();
    });

    it('Should render without errors', () => {                
        const wraper = findByTestAttr(component, 'toolbar');
        expect(wraper.length).toBe(1);
    });

    it('Should render DrawerToggleButton', () => {        
        const drawerToggleButton = findByTestAttr(component, 'toolbar__toggle-button');
        expect(drawerToggleButton.length).toBe(1);
    });

    describe('Have props', () => {
        let wrapper;
        beforeEach(() => {
            const props = {
                username: 'TestUsername'
            }
            wrapper = setUp(props);
        });

        it('Should render a username', () => {                
            const wraper = findByTestAttr(component, 'username');
            expect(wraper.length).toBe(1);
        });
    });

    describe('Have NO props', () => {
        let wrapper;
        beforeEach(() => {
            wrapper = setUp();
        });
        it('Should Not render', () => {                
            const wraper = findByTestAttr(component, 'notUsername');
            expect(wraper.length).toBe(0);
        });
    });
 
    describe('Checking prop types', () => {
        it('Should not throw a warning', () => {
            const expectedProps = {
                username: 'TestUsername'
            };
            const propsErr = checkProps(Toolbar, expectedProps);
            expect(propsErr).toBeUndefined(); 
        });
    });
})