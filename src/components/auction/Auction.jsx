import React from 'react';
import style from './Auction.scss';
import AuctionControls from '../auction_controls/AuctionControls';
import Carousel from '../carousel/Carousel';
import BiddingHistory from '../bidding_history/BiddingHistory';
import PieTimer from '../pie_timer/PieTimer';
import CountdownTimer from '../countdown_timer/CountdownTimer';
import x from '../../../img/Nintendo-3DS-AquaOpen.jpg';
import y from '../../../img/Screenshot1.png';
import z from '../../../img/Screenshot2.png';

export default class Auction extends React.Component {
  constructor() {
     super();
     this.images = [x, y, z];
     this.historyItems = [ { details: 'hello' } ];
  }

  buyNow() {
    console.log('buy now');
  }

  bid() {
    console.log('bid');
  }

  addToBasket() {
    console.log('add to basket');
  }

  watch() {
    console.log('watch');
  }

  render() {
     return ( 
       <div className='auction'>
         <div className='auction_title'> Nintendo 3ds </div>
         <Carousel images={this.images} />
         <div className='auction_time-remaining'>
           <CountdownTimer endTimestamp={1486026721000} />
           <PieTimer totalTime={500} />
         </div>
         <div className='auction_body'>
           <AuctionControls 
	           isBuyNow={true} 
 	           buyNowHandler={this.buyNow.bind(this)}
	           bidHandler={this.bid.bind(this)}
	           watchHandler={this.watch.bind(this)}	
	           addToBasketHandler={this.addToBasket.bind(this)}
	         />
         </div>

	          
       </div>
    )
  }

}
