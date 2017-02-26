import React from 'react';
import style from './AuctionControls.scss';

export default class AuctionControls extends React.Component {

   constructor(props) {
      super(props);
      this._isBuyNow = props.isBuyNow;
      this.buyNowHandler = props.buyNowHandler;
      this.bidHandler = props.buyNowHandler;
      this.addToBasketHandler = props.addToBasketHandler;
      this.watchHandler = props.watchHandler;
   }

   render() {
       const buyNowBtn = <button className="auction-controls_buy-now-btn" onClick={ this.buyNowHandler.bind(this) } ref="auctionBuyNowBtn">BUY NOW</button>;
       const addToBasketBtn = <button className="auction-controls_add-to-basket-btn" onClick={ this.addToBasketHandler.bind(this) } ref="auctionAddToBasketBtn">ADD TO BASKET</button>;
       const bidBtn = <button className="auction-controls_bid-btn" onClick={ this.bidHandler.bind(this) } ref="auctionBidBtn">BID</button>;
       const watchBtn = <button className="auction-controls_watch-btn" onClick={ this.watchHandler.bind(this) } ref="auctionWatchBtn">WATCH</button>;
       const controls = this._isBuyNow ? [buyNowBtn, addToBasketBtn, watchBtn] : [bidBtn, watchBtn];

       return <div className="auction-controls">{ controls } </div>;
   }
}
