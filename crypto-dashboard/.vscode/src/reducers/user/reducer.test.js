import {types} from '../../actions/types';
import userReducer from './reducer';

describe('User Reducer', () => {
    it('Should return default state', () => {
        const newState = userReducer(undefined, {});
        expect(newState).toEqual({});
    });

    it('Should return new state if receving type', () => {
        const user = {username: "test", password: "test"};
        const newState = userReducer(undefined, {
            type: types.GET_USER,
            payload: user
        });
        expect(newState).toEqual(user);
    });
});