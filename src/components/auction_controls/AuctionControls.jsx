import React from 'react';
import style from './AuctionControls.scss';

export default class AuctionControls extends React.Component {

   render() {
       const buyNowBtn = <button className="auction-controls_buy-now-btn" onClick={ this.props.buyNowHandler.bind(this) } ref="auctionBuyNowBtn">BUY NOW</button>;
       const addToBasketBtn = <button className="auction-controls_add-to-basket-btn" onClick={ this.props.addToBasketHandler.bind(this) } ref="auctionAddToBasketBtn">ADD TO BASKET</button>;
       const bidBtn = <button className="auction-controls_bid-btn" onClick={ this.props.bidHandler.bind(this) } ref="auctionBidBtn">BID</button>;
       const watchBtn = <button className="auction-controls_watch-btn" onClick={ this.props.watchHandler.bind(this) } ref="auctionWatchBtn">WATCH</button>;
       const controls = this.props.isBuyNow ? [buyNowBtn, addToBasketBtn, watchBtn] : [bidBtn, watchBtn];

       return <div className="auction-controls">{ controls } </div>;
   }
}
