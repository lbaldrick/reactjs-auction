import React from 'react';

export default class BiddingHistory extends React.Component {

  constructor(props) { 
    super(props);
    this.historyItems = props.historyItems;
  }

  render() {
    return ( 
      <div className="bidding-history">
        <ul className="bidding-history_list">
          {(() => {
	      const listItems = [];
              this.historyItems.forEach((item) => {
	        listItems.push(<li className="bidding-history_list_item"> {item.details} </li> ) 
	      })

	      return listItems;
	    })()
	  }
	</ul>
      </div>
     )
  }

}
