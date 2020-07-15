import React from 'react';
import {shallow} from 'enzyme';
import {findByTestAttr, checkProps} from '../../utils/index';
import Backdrop from './Backdrop';

describe('Backdrop Component', () =>{
    const contentCurrency = {
        description: 'testDescription',
            bid: 1000,
            ask: 1.2039,
            title: 'testTitle',
            currency: "$",
            price: '438562393874'
    };

    describe('Checking PropTypes', () => {
        it('Should NOT a warning', () => {            
            const expectedProps = {
                show: true,
                content: contentCurrency                
            };
            const propsError = checkProps(Backdrop, expectedProps);
            expect(propsError).toBeUndefined();
        });
    });

    describe('Component Renders', () => {
        let wrapper;

        beforeEach(() => {
            const props = {
                show: true,
                content: contentCurrency                
            };
            wrapper = shallow(<Backdrop {...props} />);
        });

        it('Should render without errors', () => {
            const component = findByTestAttr(wrapper, 'backdrop');
            expect(component.length).toBe(1);
        });

        it('Should render a title', () => {
            const title = findByTestAttr(wrapper, 'title');
            expect(title.length).toBe(1);
        });

        it('Should render without errors', () => {
            const pie = findByTestAttr(wrapper, 'pie');
            expect(pie.length).toBe(1);
        });

        it('Should render without errors', () => {
            const bar = findByTestAttr(wrapper, 'bar');
            expect(bar.length).toBe(1);
        });
    });

    describe('Should NOT render', () => {
        let wrapper;

        beforeEach(() => {
            const props = {
                show: true                               
            };
            wrapper = shallow(<Backdrop {...props} />);
        });

        it('Component is NOT render', () => {
            const component = findByTestAttr(wrapper, 'backdrop');
            expect(component.length).toBe(0);
        });
    });
});