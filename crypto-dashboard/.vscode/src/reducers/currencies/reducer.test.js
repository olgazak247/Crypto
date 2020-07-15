import {types} from '../../actions/types';
import currenciesReducer from './reducer';

describe('Currencies Reducer', () => {
    it('Should return default state', () => {
        const newState = currenciesReducer(undefined, {});
        expect(newState).toEqual([]);
    });

    it('Should return new state if receving type', () => {
        const lstCurrency = [{title: "BTC-GBP", description: "Bitcoin", active: true}, {title: "BTC-EUR", description: "Bitcoin"}, {title: "BTC-USD", description: "Bitcoin"}, {title: "ETH-GBP", description: "Bitcoin"}, {title: "ETH-EUR", description: "Bitcoin"}, {title: "ETH-USD", description: "Bitcoin"}, {title: "LTC-GBP", description: "Bitcoin"}, {title: "LTC-EUR", description: "Bitcoin"}, {title: "LTC-USD", description: "Bitcoin"}];
        const newState = currenciesReducer(undefined, {
            type: types.GET_CURRENCIES,
            payload: lstCurrency
        });
        expect(newState).toEqual(lstCurrency);
    });
});