import React from 'react';
import { connect } from 'react-redux';
import style from './SearchBar.scss';
import { search, searchSuggest, searchSuggestChanged, searchSuggestItemSelected, } from '../../redux/action_creators/SearchActions';
import SearchBar from './SearchBar.jsx';

class Search extends React.Component {

  constructor(props) {
    super(props);
  }

  onSubmit() {
    this.props.dispatch(search(this.props.query));
  }

  onKeyDown(event) {
    if (!this.props.suggestions.size) {
      return;
    }

    switch( event.keyCode ) {            
      case 38: //up                
        this.props.dispatch(searchSuggestChanged(this.selectPreviousSuggestion(this.props.selectedId, this.props.suggestions.size)));       
        event.preventDefault();
        event.stopPropagation();
      break;            
      case 40: //down                
        this.props.dispatch(searchSuggestChanged(this.selectNextSuggestion(this.props.selectedId, this.props.suggestions.size)));       
        event.preventDefault();
        event.stopPropagation();
      break;            
      case 13: //enter                
        this.props.dispatch(searchSuggestItemSelected(this.props.selectedId));          
      break;          
    }  
  }

  onItemClicked(id) {
    this.props.dispatch(searchSuggestItemSelected(id));
  }

  selectPreviousSuggestion(selectedId) {
    return selectedId === 0 ? selectedId : --selectedId;
  }

  selectNextSuggestion(selectedId, suggestionsLength) {
    return selectedId === suggestionsLength - 1 ? selectedId : ++selectedId;
  }

  handleQueryChange(query) {
    this.props.dispatch(searchSuggest(query));
  }
  
  render() {
    return <div className="search">
        <SearchBar onKeyDown={ (event) => this.onKeyDown(event) } 
        handleQueryChange={ (query) => this.handleQueryChange(query) } 
        onSubmit={ () => this.onSubmit() }
        onItemClicked={ (event) => this.onItemClicked(event) } 
        feedbackType={ this.props.feedbackType } 
        feedbackMessage={ this.props.feedbackMessage } 
        selectedId={ this.props.selectedId } 
        suggestions={ this.props.suggestions }
        query={ this.props.query }/>
     </div>
  }
}

const mapStateToProps = (state) => {
  return {
    suggestions: state.getIn(['suggestions', 'items']),
    selectedId: state.getIn(['suggestions', 'selectedId']),
    query: state.getIn(['search', 'query']),
    feedbackMessage: state.getIn(['search', 'feedbackMessage']),
    feedbackType: state.getIn(['search', 'feedbackType']),
  }
};

export default connect(mapStateToProps)(Search);