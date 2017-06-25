import React from 'react';
import style from './EnhancedPage.scss';
import Auction from '../auction/Auction.jsx';
import Search from '../search/Search.jsx';
import ButtonList from '../button_list/ButtonList.jsx';
import SearchResults from '../search_results/SearchResults.jsx';
import AuctionDetails from '../auction_details/AuctionDetails.jsx';
import SellerItemForm from '../form/SellerItemForm.jsx';
import { buySellViewToggled, } from '../../redux/action_creators/SearchActions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    viewType: state.getIn(['view', 'selectedView']),
    buttonDetails: state.getIn(['view', 'buttonDetails']),
  }
}

class EnhancedPage extends React.Component {

  componentDidMount() {
  	document.querySelector(".enhanced-page_header .search-bar_input").focus();
  }

  onViewTypeChanged() {
    this.props.dispatch(buySellViewToggled(this.props.query));
  }
   
  //TODO add react router
  render() {
    const bodyContent = this.props.viewType === 'BUY' ? 
       <div className="enhanced-page_content_search-results">
        <SearchResults store={this.props.store}/>
        <Auction store={this.props.store}/>
        <AuctionDetails store={this.props.store}/>
      </div>
      : <div className="enhanced-page_content_seller-content"> 
        <SellerItemForm store={this.props.store}/>
      </div>;

    const headerContent = this.props.viewType === 'BUY' ? <Search store={this.props.store}/> : <div> </div>;

  	return <div className="enhanced-page">
  	  <div className="enhanced-page_header">
        <div className="enhanced-page_header_title">AUCTION</div>
        <div className="enhanced-page_header_view-buttons"> 
          <ButtonList buttonDetails={this.props.buttonDetails} title="View Type:" onButtonClick={() => this.onViewTypeChanged()}/> 
        </div>
        { headerContent }
  	  </div>
  	  <div className="enhanced-page_content">
         { bodyContent }
  	  </div>
      <div className="enhanced-page_footer">
  	  </div>
  	</div>
  }
}

export default connect(mapStateToProps)(EnhancedPage);