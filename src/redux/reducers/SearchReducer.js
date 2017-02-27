import { SEARCH_ACTION_ENUM } from '../action_creators/SearchActions';
import Immutable from 'immutable';


const SEARCH_HEADERS = Immutable.List([
  { id: 'title',
    displayName: 'Title',
  }, 
  { id: 'summary',
    displayName: 'Summary',
  }, 
  { id: 'endTimestamp',
    displayName: 'End Time',
  }, 
  { id: 'startTimestamp',
    displayName: 'Start Time',
  }, 
  { id: 'askingPrice',
    displayName: 'Ask Price',
  }, 
  { id: 'currentBid',
    displayName: 'Current Bid',
  },
]);

const columnsConfig = {
  title: {
    style: {
      width: '120px',
    }
  },
   summary: {
    style: {
      width: '120px',
    }
  },
   endTimestamp: {
    style: {
      width: '80px',
    }
  },
   startTimestamp: {
    style: {
      width: '80px',
    }
  },
   askingPrice: {
    style: {
      width: '60px',
    }
  },
   currentBid: {
    style: {
      width: '60px',
    }
  }
}

const INITIAL_STATE = Immutable.fromJS({
  search: {
    items: [],
    query: '',
    error: null,
    notification: null,    
    feedbackType: null,
    feedbackMessage: null,
    headers: SEARCH_HEADERS,
    columnsConfig: columnsConfig,
    results: [],
  },
  suggestions: {
    selectedId: 0,
    items: [],
  },
  auctionDetails: {
    historyItems: [],
    description: null,
    title: null,
  },
});

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SEARCH_ACTION_ENUM.SEARCH:
      return state;
      break
    case SEARCH_ACTION_ENUM.SEARCH_SUCCESS:
      const results = action.payload.results;
      const firstResult = results[0] || [];
      const historyItems = firstResult ? Immutable.List(firstResult.history) : [];
      const description = firstResult ? firstResult.description : null;
      const title = firstResult ? firstResult.title : null;

      return state.setIn(['search', 'results'], Immutable.List(results))
               .setIn(['suggestions', 'items'], Immutable.List([]))
               .setIn(['suggestions', 'selectedId'], null)
               .setIn(['search', 'feedbackMessage'], null)
               .setIn(['search', 'feedbackType'], null)
               .setIn(['auctionDetails', 'historyItems'], historyItems)
               .setIn(['auctionDetails', 'description'], description) 
               .setIn(['auctionDetails', 'title'], title);
      break
    case SEARCH_ACTION_ENUM.SEARCH_FAILURE:
      return state.setIn(['search', 'feedbackMessage'], action.payload.feedback)
               .setIn(['search', 'feedbackType'], action.payload.type);
      break
     case SEARCH_ACTION_ENUM.SEARCH_SUGGEST:
      return state;
      break
    case SEARCH_ACTION_ENUM.SEARCH_SUGGEST_SUCCESS:
      const suggestions = action.payload.suggestions.map((name, id) => {
       return Immutable.Map({ name, id });
     });
      return state.setIn(['suggestions', 'items'], Immutable.List(suggestions))
              .setIn(['suggestions', 'selectedId'], 0)
              .setIn(['search', 'feedbackMessage'], null)
              .setIn(['search', 'feedbackType'], null)
              .setIn(['search', 'query'], action.payload.query);
      break
    case SEARCH_ACTION_ENUM.SEARCH_SUGGEST_FAILURE:
      return state.setIn(['search', 'feedbackMessage'], action.payload.feedback)
               .setIn(['search', 'feedbackType'], action.payload.type)
               .setIn(['search', 'query'], action.payload.query)
               .setIn(['suggestions', 'selectedId'], 0)
               .setIn(['suggestions', 'items'], Immutable.List([]));
      break
    case SEARCH_ACTION_ENUM.SEARCH_SUGGEST_CHANGED:
      const selectedId = action.payload.selectedId;
      return state.setIn(['suggestions', 'selectedId'], selectedId)
                .setIn(['search', 'query'], state.getIn(['suggestions', 'items', selectedId, 'name']));
      break
    case SEARCH_ACTION_ENUM.SEARCH_SUGGEST_ITEM_SELECTED:
      return state.setIn(['suggestions', 'selectedId'], 0)
                .setIn(['suggestions', 'items'], Immutable.List([]))
                .setIn(['search', 'query'], state.getIn(['suggestions', 'items', action.payload.selectedId, 'name']));
      break
  }

  return state;
};

export default reducer;