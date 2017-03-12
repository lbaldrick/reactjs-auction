import React from 'react';
import style from './BiddingHistory.scss';

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

export default BiddingHistory;