import React from 'react';
import './AskOrder.css';


const AskOrder = props =>{ 
  
  const getPercentage = () => {
    let fillPercentage = (props.maxCumulative ? props.cumulative / props.maxCumulative : 0) * 100;
    fillPercentage = Math.min(fillPercentage, 100); // Percentage can't be greater than 100%
    fillPercentage = Math.max(fillPercentage, 0); // Percentage can't be smaller than 0%
    return fillPercentage;
  }
  
  const sumQuantities = (orders) => {
    return orders.reduce((total, order) => total + order.quantity, 0);
  };
          
  return (    
      <div className="row">
        <div className="col-md-6">{props.quantity}</div>
        <div className="col-md-6 askPrice">{props.price}</div>
        {/* <div className="col-md-4" style={{backgroundSize: getPercentage() + "% 100%"}}>
          {props.cumulative}
        </div> */}
      </div>          

  );  
}

export default AskOrder;