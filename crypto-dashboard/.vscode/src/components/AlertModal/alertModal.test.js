import React from 'react';
import {shallow} from 'enzyme';
import Alert from './AlertModal';
import {findByTestAttr, checkProps} from '../../utils/index';

describe('AlertModal Component', () => {
    describe('Cheking PropTypes', () => {
        it('Should NOT throw a warning', () => {
            const expectedProps = {
                show: true,
                handleClose: () => {

                },
                showRegisterModal: () => {

                }
            };
            const propErrors = checkProps(Alert, expectedProps);
            expect(propErrors).toBeUndefined();
        });
    });

    describe('Renders', () => {
        let wrapper;
        let mockFuncClose;
        let mockFuncRegisterModal;
        beforeEach(() => {
            mockFuncClose = jest.fn();
            mockFuncRegisterModal = jest.fn();
            const props = {
                show: true,
                handleClose: mockFuncClose,                
                showRegisterModal: mockFuncRegisterModal                
            };
            wrapper = shallow(<Alert {...props} />);
        });

        it('Should render alert modal', () => {
            const modal = findByTestAttr(wrapper, 'alert');
            expect(modal.length).toBe(1);
        });

        it('Should emit callback on handleClose event', () => {
            const modal = findByTestAttr(wrapper, 'alert');
            modal.simulate('click');
            const callback = mockFuncClose.mock.calls.length;
            expect(callback).toBe(0);
        });

        it('Should emit callback on handleRegisterModal event', () => {
            const modal = findByTestAttr(wrapper, 'alert');
            modal.simulate('click');
            const callback = mockFuncRegisterModal.mock.calls.length;
            expect(callback).toBe(0);
        });
    });
});