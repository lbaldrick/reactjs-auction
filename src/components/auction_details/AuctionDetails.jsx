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
  }
};

class AuctionDetails extends React.Component {
	constructor(props) {
    	super(props);
    }

	render() {
		return <div className="auction-details">
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