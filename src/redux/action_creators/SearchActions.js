import { restClient } from '../../clients/rest';

const SEARCH_ACTION_ENUM = {
  SEARCH: 'SEARCH',
  SEARCH_SUCCESS: 'SEARCH_SUCCESS',
  SEARCH_FAILURE: 'SEARCH_FAILURE',
  SEARCH_IN_PROGRESS: 'SEARCH_IN_PROGRESS',
  SEARCH_SUGGEST: 'SEARCH_SUGGEST',
  SEARCH_SUGGEST_SUCCESS: 'SEARCH_SUGGEST_SUCCESS',
  SEARCH_SUGGEST_FAILURE: 'SEARCH_SUGGEST_FAILURE',
  SEARCH_SUGGEST_IN_PROGRESS: 'SEARCH_SUGGEST_IN_PROGRESS',
  SEARCH_SUGGEST_CHANGED: 'SEARCH_SUGGEST_CHANGED',
  SEARCH_SUGGEST_ITEM_SELECTED: 'SEARCH_SUGGEST_ITEM_SELECTED',
  BUY_SELL_VIEW_TOGGLED: 'BUY_SELL_VIEW_TOGGLED',
  CREATE_SELL_ITEM: 'CREATE_SELL_ITEM',
}

const FEEDBACK_MESSAGE_ENUM = {
  QUERY_TOO_SHORT: 'Query must be at least 2 characters long',
}

const FEEDBACK_TYPES_ENUM = {
  WARN: 'warning',
  ERROR: 'error',
  SUCCESS: 'success',
}

function search(query) {
 return (dispatch) => {
     const queryLength = query.length;
     if (queryLength <= 1) {
      const feedback = queryLength ? FEEDBACK_MESSAGE_ENUM.QUERY_TOO_SHORT : null;
      const type = queryLength ? FEEDBACK_TYPES_ENUM.WARN : null;

      return Promise.resolve(dispatch(searchFailure(feedback, type)));
    }
    restClient.get(`auction/search/${query}`)
      .then((response) => dispatch(searchSuccess(response.items, query)))
      .catch((error) => dispatch(searchFailure(error)));
    }
}

function searchSuggest(query) {
  return (dispatch) => {
    const queryLength = query.length;
     if (queryLength <= 1) {
      const feedback = queryLength ? FEEDBACK_MESSAGE_ENUM.QUERY_TOO_SHORT : null;
      const type = queryLength ? FEEDBACK_TYPES_ENUM.WARN : null;

      return Promise.resolve(dispatch(searchSuggestFailure(feedback, type, query)));
    }

    restClient.get(`auction/search/suggest/${query}`)
      .then((responseItems) => dispatch(searchSuggestSuccess(responseItems.suggestions, query)))
      .catch((error) => dispatch(searchSuggestFailure(error)));
  }
}

function searchInProgress(items) {
  return {
    type: SEARCH_ACTION_ENUM.SEARCH_IN_PROGRESS,
    payload: null,
    error: null,
  };
}

function searchSuccess(results, query) {
  return {
    type: SEARCH_ACTION_ENUM.SEARCH_SUCCESS,
    payload: { results, query },
  };
}

function searchFailure(feedback, type) {
  return {
    type: SEARCH_ACTION_ENUM.SEARCH_FAILURE,
    payload: { feedback, type },
  };
}

function searchSuggestInProgress(items) {
  return {
    type: SEARCH_ACTION_ENUM.SEARCH_SUGGEST_IN_PROGRESS,
    payload: null,
  };
}

function searchSuggestSuccess(suggestions, query) {
  return {
    type: SEARCH_ACTION_ENUM.SEARCH_SUGGEST_SUCCESS,
    payload: { suggestions, query },
  };
}

function searchSuggestFailure(feedback, type, query) {
  return {
    type: SEARCH_ACTION_ENUM.SEARCH_SUGGEST_FAILURE,
    payload: { query, feedback, type },
  };
}

function searchSuggestChanged(selectedId) {
  return {
    type: SEARCH_ACTION_ENUM.SEARCH_SUGGEST_CHANGED,
    payload: { selectedId },
  };
}

function searchSuggestItemSelected(selectedId) {
  return {
    type: SEARCH_ACTION_ENUM.SEARCH_SUGGEST_ITEM_SELECTED,
    payload: { selectedId },
  };
}

function buySellViewToggled() {
  return {
    type: SEARCH_ACTION_ENUM.BUY_SELL_VIEW_TOGGLED,
  };
}

function createSellItem(name, summary, description, buyNow, condition, model, features, purchasedDate, location, sellerNotes) {
  return {
    type: SEARCH_ACTION_ENUM.CREATE_SELL_ITEM,
    payload: { name, summary, description, buyNow, condition, model, features, purchasedDate, location, sellerNotes }
  };
}

export { SEARCH_ACTION_ENUM, search, searchSuggest, searchSuggestChanged, searchSuggestItemSelected, buySellViewToggled, createSellItem };