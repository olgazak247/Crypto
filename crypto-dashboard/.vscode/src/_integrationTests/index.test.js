import moxios from'moxios';
import {testStore} from './../utils';
import {fetchCurrencies, fetchMessages} from './../actions';

describe('fetchCurrencies action', () => {

    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    test('Store is updated correctly', () => {
        const expectedState = [
            {title: "BTC-GBP", description: "Bitcoin", active: true, ask: 36.46, bid: 36.39, price: "36.46"}, 
            {title: "BTC-EUR", description: "Bitcoin", active: false, ask: 36.46, bid: 36.39, price: "36.46"}, 
            {title: "BTC-USD", description: "Bitcoin", active: false, ask: 36.46, bid: 36.39, price: "36.46"}, 
            {title: "ETH-GBP", description: "Ethereum", active: false, ask: 36.46, bid: 36.39, price: "36.46"}, 
            {title: "ETH-EUR", description: "Ethereum", active: false, ask: 36.46, bid: 36.39, price: "36.46"}, 
            {title: "ETH-USD", description: "Ethereum", active: false, ask: 36.46, bid: 36.39, price: "36.46"}, 
            {title: "LTC-GBP", description: "Litecoin", active: false, ask: 36.46, bid: 36.39, price: "36.46"}, 
            {title: "LTC-EUR", description: "Litecoin", active: false, ask: 36.46, bid: 36.39, price: "36.46"}, 
            {title: "LTC-USD", description: "Litecoin", active: false, ask: 36.46, bid: 36.39, price: "36.46"}
        ];

        const store = testStore();

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: expectedState
            });            
        });

        return store.dispatch(fetchCurrencies())
            .then(() => {
                const newState = store.getState();
                expect(newState.currencies).toBe(expectedState);
            })
    });
});

// describe('fetchMessages action', () => {

//     beforeEach(() => {
//         moxios.install();
//     });

//     afterEach(() => {
//         moxios.uninstall();
//     });

//     test('Store is updated correctly', () => {
//         const expectedState = null;

//         const store = testStore();

//         moxios.wait(() => {
//             const request = moxios.requests.mostRecent();
//             request.respondWith({
//                 status: 200,
//                 // response: expectedState
//             });            
//         });

//         return store.dispatch(fetchMessages())
//             .then(() => {
//                 const newState = store.getState();
//                 expect(newState.status).toBe(request.status);
//             })
//     });
// });
