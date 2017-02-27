import React from 'react';
import style from './AuctionDetails.scss';
import AccordianMenu from '../accordian_menu/AccordianMenu';
import { connect } from 'react-redux';

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
	}
];

const BiddingHistory = (historyItems) => {
	return <ul className="bidding-history">
		{
			historyItems.map((item) => {
				return <li className="bidding-history_item"> 
					<span className="bidding-history_item_timestamp">{ item.timestamp }</span>
					<span className="bidding-history_item_user-id">{ item.userId }</span>
					<span className="bidding-history_item_bid">{ item.bid }</span>
				</li>
			})
		}
	</ul>
};

const ItemDescription = (description) => {
	return <div className="item-description">
		{ description }
	</div>
};

const mapStateToProps = (state) => {
  return {
    historyItems: state.getIn(['auctionDetails', 'historyItems']),
    description: state.getIn(['auctionDetails', 'description']),
    title: state.getIn(['auctionDetails', 'title']),
  }
};

class AuctionDetails extends React.Component {
	constructor(props) {
    	super(props);
    }

	render() {
		return <div className="AuctionDetails">
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