import React from 'react';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { Btc, Etc, Ltc } from 'react-cryptocoins';
import './SideDrawer.css';
import { Button } from 'react-bootstrap';

const sideDrawer = props => {
    let drawerClasses = 'side-drawer';
    if(props.show){
        drawerClasses = 'side-drawer open';
    }
    
    let lstCurrency = props.lstCurrency;        
    let filteredLst = lstCurrency.length > 0 && lstCurrency[0].description !=null ? lstCurrency.filter(        
        (currency) => {
            return currency.description.toLowerCase().indexOf(props.search.toLowerCase()) !== -1;
        }
    ) : null;  
        

    return (     
        <nav className={drawerClasses}>             
            <input className='search-filter' type="text" placeholder="Search" value={props.search} onChange={props.handlerSearch}/>            
            <ul>
                {
                    filteredLst.map((item, index) => (                                             
                        <li key={ index }>                            
                            <Button variant="dark" active={item.active} size="lg" onClick={() => props.click(item)}>
                                <div className="row">                                                                                                                      
                                    { 
                                        (item.description.toLowerCase() === 'bitcoin')  ? (
                                            <div className="col-sm-1 leftIcon"><Btc /></div> 
                                        ) : (item.description.toLowerCase() === 'ethereum') ? (
                                            <div className="col-sm-1 leftIcon"><Etc /></div> 
                                        ) : (
                                            <div className="col-sm-1 leftIcon"><Ltc /></div>
                                        ) 
                                    }
                                    <div className="col-sm-3">
                                        <div className="row">
                                            <span className="titleItem leftText col-sm">{ item.title }</span>
                                        </div> 
                                        <div className="row">
                                            <span className="descriptionItem leftText col-sm">{ item.description }</span>
                                        </div>
                                    </div> 
                                    <div className="col-sm-2 leftText" style={{padding:0}}><Sparklines  data={item.spPrices} limit={5} width={100} height={20} margin={5}><SparklinesLine color={(item.difference != null && item.difference.substring(0, 1) === '-') ? 'rgb(229, 85, 65)' : 'rgb(0, 156, 75)'} /></Sparklines></div>                                                                                                                                                          
                                    <div className="col-sm-6">                   
                                        <div className="row">                                                                                                                         
                                            <span className="volume leftText col-sm-8">{item.volume} {item.title.substring(0,3)}</span>
                                            <span className="rightText priceText col-sm-4">{ item.currency }{ item.price }</span>
                                        </div>
                                        <div className="row">                                            
                                            <span className="descriptionItem leftText col-sm-8">Volume</span>
                                            <span className={(item.difference != null && item.difference.substring(0, 1) === '-') ? 'priceDifference rightText col-sm-4 redPriceDifference' : 'priceDifference rightText col-sm-4 greenPriceDifference'} >{item.difference}</span>
                                        </div>
                                    </div> 
                                </div>
                            </Button>
                        </li>                
                    ))
                }  
            </ul>                                
        </nav>        
     ); 
}

export default sideDrawer;

