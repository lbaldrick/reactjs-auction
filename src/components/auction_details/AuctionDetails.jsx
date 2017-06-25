import React from 'react';
import style from './AuctionDetails.scss';
import AccordianMenu from '../accordian_menu/AccordianMenu';
import { connect } from 'react-redux';
import BiddingHistory from './BiddingHistory';
import ItemDescription from './ItemDescription';

const MENU_ITEMS = [
	{
		displayName: 'Description',
		details: (details) => ItemDescription(details),
		propName: 'description',
	},
	{
		displayName: 'History',
		details: (historyItems) => BiddingHistory(historyItems),
		propName: 'historyItems',
	},
	// {
	// 	displayName: 'Seller Information',
	// 	details: (sellerInfo) => ItemSpecifics(sellerInfo),
	// 	propName: 'sellerInfo',
	// }
];

const mapStateToProps = (state) => {
  return {
    historyItems: state.getIn(['auctionDetails', 'history']),
    description: state.getIn(['auctionDetails', 'description']),
    title: state.getIn(['auctionDetails', 'title']),
    selectedId: state.getIn(['search', 'selectedSearchResultId']),
  }
};

class AuctionDetails extends React.Component {
	constructor(props) {
    	super(props);
    	this._isVisible = true;
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
                this.refs['auction-details'].classList.add("--visible");
            } else {
                this.refs['auction-details'].classList.remove("--visible");
            }
        });
    }

	render() {
		return <div ref="auction-details" className="auction-details">
			<AccordianMenu 
				items={ 
					MENU_ITEMS.map(({ displayName, details, propName }) => {
						return {
							displayName,
							details: details(this.props[propName]),
						}
					})
		     	 }
				title={ this.props.title }
			/>
		</div>
	}
}

export default connect(mapStateToProps)(AuctionDetails);