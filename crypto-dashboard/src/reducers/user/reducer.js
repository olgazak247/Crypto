import {types} from '../../actions/types';

export default (state= [], action) => {
    switch(action.type){
        case types.GET_USER:
            return action.payload;
        default:
            return state;
    }
}