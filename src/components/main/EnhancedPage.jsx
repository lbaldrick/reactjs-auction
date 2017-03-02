import React from 'react';
import style from './EnhancedPage.scss';
import Auction from '../auction/Auction.jsx';
import Search from '../search/Search.jsx';
import SearchResults from '../search_results/SearchResults.jsx';
import AuctionDetails from '../auction_details/AuctionDetails.jsx';

export default class EnhancedPage extends React.Component {

  componentDidMount() {
  	document.querySelector(".enhanced-page_header .search-bar_input").focus();
  }

  render() {
  	return <div className="enhanced-page">
  	  <div className="enhanced-page_header">
        <div className="enhanced-page_header_title">AUCTION</div>
 		    <Search store={this.props.store}/>
  	  </div>
  	  <div className="enhanced-page_content">
        <div className="enhanced-page_content_search-results">
          <SearchResults store={this.props.store}/>
          <Auction/>
          <AuctionDetails store={this.props.store}/>
        </div>
        
        
  	  </div>
      <div className="enhanced-page_footer">
  	  </div>
  	</div>
  }
}