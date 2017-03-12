import { SEARCH_ACTION_ENUM } from '../action_creators/SearchActions';
import Immutable from 'immutable';
import { DateTimeFormat } from '../util/DateTime';

const createResultViewRecord = (record) => {
  const startDateTime = DateTimeFormat(record.startTimestamp);
  const endDateTime = DateTimeFormat(record.endTimestamp);

  return Object.assign({ startDateTime, endDateTime }, record)
}


const SEARCH_HEADERS = Immutable.List([
  { id: 'title',
    displayName: 'Title',
  }, 
  { id: 'summary',
    displayName: 'Summary',
  }, 
  { id: 'endDateTime',
    displayName: 'End Time',
  }, 
  { id: 'startDateTime',
    displayName: 'Start Time',
  }, 
  { id: 'askingPrice',
    displayName: 'Price',
  }, 
  { id: 'currentBid',
    displayName: 'Bid',
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
   endDateTime: {
    style: {
      width: '120px',
    }
  },
   startDateTime: {
    style: {
      width: '120px',
    }
  },
   askingPrice: {
    style: {
      width: '60px',
      ['text-align']: 'center',
    }
  },
   currentBid: {
    style: {
      width: '60px',
      ['text-align']: 'center',
    }
  }
}

const INITIAL_STATE = Immutable.fromJS({
  search: {
    query: '',
    error: null,
    notification: null,    
    feedbackType: null,
    feedbackMessage: null,
    headers: SEARCH_HEADERS,
    columnsConfig,
    results: Immutable.List([]),
  },
  suggestions: {
    selectedId: 0,
    items: Immutable.List([]),
  },
  auctionDetails: {
    endTimestamp: 0,
    startTimestamp: 0,
    history: Immutable.List([]),
    description: null,
    title: null,
    askingPrice: null,
    currentBid: null,
  },
});

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SEARCH_ACTION_ENUM.SEARCH:
      return state;
      break
    case SEARCH_ACTION_ENUM.SEARCH_SUCCESS:
      const results = action.payload.results;
      const firstResult = results[0] || null;
      const auctionDetails = firstResult ? Immutable.fromJS(firstResult) : null;

      return state.setIn(['search', 'results'], Immutable.List(results.map(createResultViewRecord)))
               .setIn(['suggestions', 'items'], Immutable.List([]))
               .setIn(['suggestions', 'selectedId'], null)
               .setIn(['search', 'feedbackMessage'], null)
               .setIn(['search', 'feedbackType'], null)
               .set('auctionDetails', auctionDetails);
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