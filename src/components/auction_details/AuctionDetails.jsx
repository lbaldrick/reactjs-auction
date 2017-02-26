import React from 'react;
import AccordianMenu from '../accordian_menu/AccordianMenu';

const BiddingHistory = (historyItems) => {
	return <ul className="bidding-history">
		{
			historyItems.map((item) => {
				return <li className="bidding-history_item"> 
					<span className="bidding-history_item_user-id">{ item.timestamp }</span>
					<span className="bidding-history_item_user-id">{ item.userId }</span>
					<span className="bidding-history_item_user-id">{ item.bid }</span>
				</li>
			})
		}
	</ul>
}

const ItemDescription = (description) => {
return <div className="item-description">
		{ description }
	</div>
}

const AuctionDetails = ({ description,  historyItems }) => {
	return {
		<div className="AuctionDetails">
			<AccordianMenu 
				items={ detailsItems }
				decription={ ItemDescription(description) }
				history={ BiddingHistory(historyItems) }
			/>
		</div>
	}
}

export default AuctionDetails;