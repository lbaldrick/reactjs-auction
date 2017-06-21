import React from 'react';
import style from './Auction.scss';
import AuctionControls from '../auction_controls/AuctionControls';
import Carousel from '../carousel/Carousel';
import PieTimer from '../pie_timer/PieTimer';
import CountdownTimer from '../countdown_timer/CountdownTimer';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  //const startTimestamp = state.getIn(['auctionDetails', 'startTimestamp']);
  //const endTimestamp = state.getIn(['auctionDetails', 'endTimestamp']);
  const startTimestamp = Date.now();
  const endTimestamp = startTimestamp + (Math.floor(Math.random() * 60000) + 5000);

  return {
    images: state.getIn(['auctionDetails', 'images']),
    endTimestamp,
    totalTime: (endTimestamp - startTimestamp) / 1000,
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
