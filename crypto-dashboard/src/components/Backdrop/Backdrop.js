import React from 'react';
import './Backdrop.css';
import { Bar, Line } from 'react-chartjs-2';
import { CircularGauge, Scale, Label, RangeContainer, Range, Tooltip, Title, Font, Border, Animation, Size } from 'devextreme-react/circular-gauge';
import PropTypes from 'prop-types';

const backdrop = props => {     
  if(!props.content){
      return null;
  } 

  let backdropClasses = 'backdrop';
  if(!props.show){
      backdropClasses = 'backdrop open';
  }        
  
  let prevPriceChart = props.priceChart;   
  let dates = [];  
  let prices = [];
  let volumes = [];
  let chartColors = [];  
  let minVolume;
  let maxVolume;
  let minPrice;
  let maxPrice; 
  const openPrice = parseFloat(props.content.open);

  let last =  (array, n) => {
    if (array == null) 
      return void 0;
    if (n == null) 
       return array[array.length - 1];
    return array.slice(Math.max(array.length - n, 0));  
  };
  
  if(prevPriceChart != null){
    if(prevPriceChart.pricesChart.length > 125){      
      if(prevPriceChart.pricesChart != null){
        prevPriceChart.pricesChart = last(prevPriceChart.pricesChart, 125);
      }
    }
    for(var i = 0; i < prevPriceChart.pricesChart.length; i++){
      var currentDate = new Date(prevPriceChart.pricesChart[i][0]);
      let hours = currentDate.getHours().toString().length > 1 ? currentDate.getHours() : '0' + currentDate.getHours();
      let minutes = currentDate.getMinutes().toString().length > 1 ? currentDate.getMinutes() : '0' + currentDate.getMinutes();
      let seconds = currentDate.getSeconds().toString().length > 1 ? currentDate.getSeconds() : '0' + currentDate.getSeconds();            
      if(parseFloat(prevPriceChart.pricesChart[i][1]) > 10){
        dates.push(hours + ":" + minutes + ":" + seconds);
        prices.push(parseFloat(prevPriceChart.pricesChart[i][1])); 
        volumes.push(parseFloat(prevPriceChart.pricesChart[i][2]).toFixed(3));   
        if(i === 0)  {  
          let diff = prevPriceChart.pricesChart[i][1]- openPrice;
          if(diff < 0)
          {
            chartColors.push('rgb(229, 85, 65)');
          }else{
            chartColors.push('rgb(0, 156, 75)');
          }          
        } else{
          if(parseFloat(prevPriceChart.pricesChart[i - 1][1]).toFixed(2) > parseFloat(prevPriceChart.pricesChart[i][1]).toFixed(2)){
            chartColors.push('rgb(229, 85, 65)');
          }else{
            chartColors.push('rgb(0, 156, 75)');
          }          
        }
        if(minVolume == null){
          minVolume = parseFloat(prevPriceChart.pricesChart[i][2]).toFixed(3);
          maxVolume = parseFloat(prevPriceChart.pricesChart[i][2]).toFixed(3);
        }else{
          if(minVolume > parseFloat(prevPriceChart.pricesChart[i][2]).toFixed(3)){
            minVolume = parseFloat(prevPriceChart.pricesChart[i][2]).toFixed(3);
          }
          if(maxVolume < parseFloat(prevPriceChart.pricesChart[i][2]).toFixed(3)){
            maxVolume = parseFloat(prevPriceChart.pricesChart[i][2]).toFixed(3);
          }
        }
        if(minPrice == null){
          minPrice = parseFloat(prevPriceChart.pricesChart[i][1]).toFixed(2);
          maxPrice = parseFloat(prevPriceChart.pricesChart[i][1]).toFixed(2);
        }else{
          if(minPrice > parseFloat(prevPriceChart.pricesChart[i][1]).toFixed(2)){
            minPrice = parseFloat(prevPriceChart.pricesChart[i][1]).toFixed(2);
          }
          if(maxPrice < parseFloat(prevPriceChart.pricesChart[i][1]).toFixed(2)){
            maxPrice = parseFloat(prevPriceChart.pricesChart[i][1]).toFixed(2);
          }
        }
      }                     
    }      
  }    

  const data = (canvas) => {
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, 1000); 
    gradient.addColorStop(0, "rgba(14, 125, 255, 0.5)");
    gradient.addColorStop(0.3, "rgba(6, 13, 19, 0.7)");
    gradient.addColorStop(1, "rgba(6, 13, 19, 1)");
    
    return {
      labels: dates,
      datasets: [{
        label: props.content.description + ' ' + props.content.currency + ' Price and Volume',
        type:'line',
        data: prices,
        fill: true,
        lineTension: 0,
        borderColor: 'rgb(14, 125, 255)',
        backgroundColor: gradient,        
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgb(14, 125, 255)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 1,
        pointHoverBackgroundColor: 'rgb(14, 125, 255)',
        pointHoverBorderColor: 'rgb(14, 125, 255)',
        pointHoverBorderWidth: 1,
        pointRadius: 1,
        pointHitRadius: 1             
      }]
    }
  };

  const options = {
    plugins: {
      filler: {
          propagate: true
      }
    },
    legend: {
      display: true,
      position: 'top',
      labels: {
        boxWidth: 0,
        fontColor: 'white'
      }
    },
    responsive: true,    
    elements: {
      line: {
        fill: false
      }
    },
    scales: {
      xAxes: [{
        gridLines: {
          display: false,          
        },
        scaleLabel: {
          display: false,                
        },
        ticks: {
          display: false,
        }       
      }],      
    },
    tooltips: {
      mode: 'label',
      callbacks: {
        title: function(tooltipItem, data) {
          return data['labels'][tooltipItem[0]['index']];
        },
        label: function(tooltipItem, data) {          
          return parseFloat(data['datasets'][0]['data'][tooltipItem['index']]).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");                    
        }
      },        
    }
  };     
    
  const dataVolume = {
    labels: dates,
    datasets: [{        
      type:'bar',
      data: volumes,
      fill: true,
      backgroundColor: chartColors,
      borderColor: chartColors,
      hoverBackgroundColor: chartColors,
      hoverBorderColor: chartColors,}]
  };

  const optionsVolume = {
    plugins: {
      filler: {
          propagate: true
      }
    },
    legend: {
      display: false,
      position: 'top',
      labels: {
        boxWidth: 0,
        fontColor: 'white'
      }
    },
    responsive: true,
    scales: {
      xAxes: [{
        gridLines: {
          display: false,          
        },
        scaleLabel: {
          display: false,                
        }
      }], 
      yAxes: [{
        ticks: {
          display: false,
        }
      }]     
    },
    tooltips: {
      mode: 'label',
      callbacks: {
        title: function(tooltipItem, data) {
          return data['labels'][tooltipItem[0]['index']];
        },
        label: function(tooltipItem, data) {          
          return parseFloat(data['datasets'][0]['data'][tooltipItem['index']]).toFixed(3).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");                    
        }
      },        
    }
  };
    
  const title = props.content.description + ' Price Difference %';  
  const titleVolume = props.content.description + ' Volume'; 
  const titlePrice =  props.content.description + ' ' + props.content.currency + ' Price';
  let diffPrices = parseFloat(props.content.difference);
  let volume = props.content.volume != null ? parseFloat(props.content.volume.replace(',', '')) : 0;  
  let price = props.content.price != null ? parseFloat(props.content.price.replace(',', '')) : 0;
 
  let customizeText = ({ valueText }) => {
    return `${valueText} %`;
  }
  let customizeTextVolume = ({ valueText }) => {
    return `${valueText}`;
  }
  let customizeTextPrice = ({ valueText }) => {
    return `${props.content.currency} ${valueText}`;
  }
  let customizeTooltip = ({ valueText }) => {
    return {
      text: `${valueText} %`
    };
  }
  let customizeTooltipVolume = ({ valueText }) => {
    return {
      text: `${valueText}`
    };
  } 
  let customizeTooltipPrice = ({ valueText }) => {
    return {
      text: `${props.content.currency} ${valueText}`
    };
  }  

  let baseVolume =  0;
  let basePrice = 0;
  let interval = 0;
  let intervalPrice = 0;
  if(maxVolume === minVolume){
    minVolume = 0;
    maxVolume = 1;
    baseVolume = 0.5;
    interval = 0.25;
  }else{
    baseVolume = parseFloat((parseFloat((maxVolume - minVolume) / 2) + parseFloat(minVolume)).toFixed(3));
    interval = parseFloat((parseFloat((maxVolume - minVolume) / 5)).toFixed(3));
  }
  if(maxPrice === minPrice){
    minPrice = 0;
    maxPrice = 1;
    basePrice = 0.5;
    intervalPrice = 0.25;
  }else{
    basePrice = parseFloat((parseFloat((maxPrice - minPrice) / 2) + parseFloat(minPrice)).toFixed(2));
    intervalPrice = parseFloat((parseFloat((maxPrice - minPrice) / 5)).toFixed(2));
  }
            
  return(      
    <div className={backdropClasses} data-test='backdrop'> 
      <hr></hr>                        
      <Line data={data} options={options} height={90} ></Line>  
      <Bar data={dataVolume} height={25} options={optionsVolume}></Bar>                      
      <hr></hr> 
      <div className="row">  
        <div className="col-md-4"> 
          <CircularGauge id="gauge" value={ diffPrices }  >
            <Size height={250} />
            <Scale startValue={-5} endValue={5} baseValue={0} tickInterval={2.5}>
              <Label customizeText={customizeText} />          
            </Scale> 
            <Tooltip enabled={true} customizeTooltip={customizeTooltip} color={'rgba(0, 0, 0, 0.2)'} borderColor={'rgba(0, 0, 0, 0.2)'}> 
              <Font color="white"/>  
              <Border color="black"/>        
            </Tooltip>      
            <RangeContainer>
              <Range startValue={-5} endValue={0} color='rgb(229, 85, 65)' />          
              <Range startValue={0} endValue={5} color='rgb(0, 156, 75)' />
            </RangeContainer>        
            <Title text={title} >
              <Font size={14} color="white" />
            </Title>
            <Animation enabled={true} />
          </CircularGauge>
        </div> 
        <div className="col-md-4"> 
          <CircularGauge id="gaugePrice" value={ price }  >
            <Size height={250} />
            <Scale startValue={parseFloat(minPrice)} endValue={parseFloat(maxPrice)} baseValue={basePrice} tickInterval={intervalPrice}>
              <Label customizeText={customizeTextPrice} />          
            </Scale> 
            <Tooltip enabled={true} customizeTooltip={customizeTooltipPrice} color={'rgba(0, 0, 0, 0.2)'} borderColor={'rgba(0, 0, 0, 0.2)'}> 
              <Font color="white"/>  
              <Border color="black"/>        
            </Tooltip>      
            <RangeContainer>
              <Range startValue={minPrice} endValue={openPrice} color='rgb(229, 85, 65)' />          
              <Range startValue={openPrice} endValue={maxPrice} color='rgb(0, 156, 75)' />
            </RangeContainer>        
            <Title text={titlePrice} >
              <Font size={14} color="white" />
            </Title>
            <Animation enabled={true} />
          </CircularGauge>
        </div> 
        <div className="col-md-4"> 
          <CircularGauge id="gaugeVolume" value={ volume }  >
            <Size height={250} />
            <Scale startValue={parseFloat(minVolume)} endValue={parseFloat(maxVolume)} baseValue={baseVolume} tickInterval={interval}>
              <Label customizeText={customizeTextVolume} />          
            </Scale> 
            <Tooltip enabled={true} customizeTooltip={customizeTooltipVolume} color={'rgba(0, 0, 0, 0.2)'} borderColor={'rgba(0, 0, 0, 0.2)'}> 
              <Font color="white"/>  
              <Border color="black"/>        
            </Tooltip>      
            <RangeContainer>
              <Range startValue={parseFloat(minVolume)} endValue={baseVolume} color='rgb(229, 85, 65)' />          
              <Range startValue={baseVolume} endValue={parseFloat(maxVolume)} color='rgb(0, 156, 75)' />
            </RangeContainer>        
            <Title text={titleVolume} >
              <Font size={14} color="white" />
            </Title>
            <Animation enabled={true} />
          </CircularGauge>
        </div>
      </div> 
    </div>                          
  );
}

backdrop.propTypes = {
  show: PropTypes.bool,
  content: PropTypes.shape({
    description: PropTypes.string,        
    title: PropTypes.string,
    currency: PropTypes.string,
    price: PropTypes.string,
    difference: PropTypes.string
  })
}

export default backdrop;