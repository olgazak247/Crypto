import React from 'react';
import  './OrderBook.css';
import AskOrder from '../AskOrder/AskOrder';
import BidOrder from '../BidOrder/BidOrder';

const OrderBook = props => {
    
    const sumQuantities = (orders) => {
        return orders.reduce((total, order) => total + order.quantity, 0);
    }

    let totalAsks = props.asks != null ? sumQuantities(props.asks) : 0;
    let totalBids =props.bids != null ? sumQuantities(props.bids) : 0;
    // let currentAsks = [{price: 234, quantity: 3465}, {price:3456, quantity: 3465}];
    // let currentBids = [{price: 457, quantity: 56757}, {price: 456767, quantity: 5679}];
    // let totalAsks = sumQuantities(currentAsks);
    // let totalBids = sumQuantities(currentBids);
    let maxCumulative = Math.max(totalAsks, totalBids);

    let deepCopyArrayOfObj = (arr => arr.map(order => Object.assign({}, order)));

    // Deep copy and sort orders
    let askOrders = props.asks != null ? deepCopyArrayOfObj(props.asks).sort((a, b) => a.price > b.price).slice(0, 20) : []; // ascending order
    let bidOrders = props.bids != null ? deepCopyArrayOfObj(props.bids).sort((a, b) => a.price < b.price).slice(0, 20) : []; // descending order
    // let askOrders = deepCopyArrayOfObj(currentAsks).sort((a, b) => a.price > b.price).reverse(); // ascending order
    // let bidOrders = deepCopyArrayOfObj(currentBids).sort((a, b) => a.price < b.price); // descending order
    
    function renderOrders(ComponentClass, orders) {
        let cumulative = 0;
        return orders.map((order, index) => {
          order.cumulative = (cumulative += order.quantity);
          order.maxCumulative = maxCumulative;
          return (<ComponentClass key={index} {...order} />);
        });
      }
    
    return ( 
        <div>            
            <div className="title">Order Book</div> 
            <div className='row subTitle'>
                <div className='col-md-6'><span className="smallSpan">Market size</span></div>  
                <div className='col-md-6'><span className="smallSpan">Price ({props.currency})</span></div>  
            </div> 
            <hr></hr>
            {renderOrders(BidOrder, bidOrders)} {renderOrders(AskOrder, askOrders)}                        
            <hr></hr>
            
        </div>
    );
}

export default OrderBook;