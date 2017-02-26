import React from 'react';
import style from './SearchBar.scss';
import Feedback from '../Feedback/Feedback.jsx';
import Dropdown from '../Dropdown/Dropdown.jsx';

const PLACEHOLDER_TEXT = 'Enter text...';

const SEARCH_BUTTON_TEXT = 'search';

const searchBar = ({ onKeyDown, handleQueryChange, onSubmit, onItemClicked, query, feedbackType, feedbackMessage, selectedId, suggestions,}) => {
    return <div className="search-bar">
      	<label className="search-bar_label">Search</label> 
      	<input 
          className="search-bar_input" type="text" 
          placeholder={ PLACEHOLDER_TEXT }
          value={ query }
          onKeyDown={ onKeyDown } 
          onChange={ (event) => {
              handleQueryChange(event.target.value); 
            }
          }>
        </input>
      	<button 
          className="search-bar_submit" 
          onClick={ onSubmit }>
            { SEARCH_BUTTON_TEXT }
        </button>
        <Feedback 
          type={ feedbackType } 
          message={ feedbackMessage }/> 
        <Dropdown 
          items={ suggestions } 
          selectedId={ selectedId } 
          onItemClicked={ onItemClicked }/>
     </div>
};

export default searchBar;