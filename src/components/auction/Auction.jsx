import React from 'react';
import style from './Auction.scss';
import AuctionControls from '../auction_controls/AuctionControls';
import Carousel from '../carousel/Carousel';
import PieTimer from '../pie_timer/PieTimer';
import CountdownTimer from '../countdown_timer/CountdownTimer';
import x from '../../../img/Nintendo-3DS-AquaOpen.jpg';
import y from '../../../img/Screenshot1.png';
import z from '../../../img/Screenshot2.png';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const startTimestamp = state.getIn(['auctionDetails', 'startTimestamp']);
  const endTimestamp = state.getIn(['auctionDetails', 'endTimestamp']);

  return {
    images: [x, y, z],
    endTimestamp,
    totalTime: endTimestamp - startTimestamp,
  }
};

class Auction extends React.Component {

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
         <Carousel images={ this.props.images } />
         <div className='auction_time-remaining'>
           <CountdownTimer endTimestamp={ this.props.endTimestamp } />
           <PieTimer totalTime={ this.props.totalTime } />
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

export default connect(mapStateToProps)(Auction);
