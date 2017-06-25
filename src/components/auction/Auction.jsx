import React from 'react';
import style from './Auction.scss';
import AuctionControls from '../auction_controls/AuctionControls';
import Carousel from '../carousel/Carousel';
import PieTimer from '../pie_timer/PieTimer';
import CountdownTimer from '../countdown_timer/CountdownTimer';
import { searchResultItemSelected, } from '../../redux/action_creators/SearchActions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const startTimestamp = state.getIn(['auctionDetails', 'startTimestamp']);
  const endTimestamp = state.getIn(['auctionDetails', 'endTimestamp']);
  const selectedId = state.getIn(['search', 'selectedSearchResultId']);

  return {
    images: state.getIn(['auctionDetails', 'images']),
    endTimestamp,
    totalTime: (endTimestamp - startTimestamp) / 1000,
    selectedId,
  }
};

class Auction extends React.Component {

  constructor(props) {
    super(props);
    this._isVisible = true;
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

  componentWillUpdate(props) {
    if (props.selectedId < 1) {
        this._isVisible = false;
    } else if (props.selectedId === this.props.selectedId && this._isVisible){
        this._isVisible = false;
    } else {
        this._isVisible = true;
    }
  }

  componentDidUpdate() {
    requestAnimationFrame(() => {
      if(this._isVisible) {
          this.refs['auction'].classList.add("--visible");
      } else {
          this.refs['auction'].classList.remove("--visible");
      }
    });
  }

  render() {
     return ( 
       <div ref='auction' className='auction'>
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
