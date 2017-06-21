import { SEARCH_ACTION_ENUM } from '../action_creators/SearchActions';
import Immutable from 'immutable';
import { DateTimeFormat } from '../util/DateTime';

const createResultViewRecord = (record) => {
  const startDateTime = DateTimeFormat(record.startTimestamp);
  const endDateTime = DateTimeFormat(record.endTimestamp);

  return Object.assign({ startDateTime, endDateTime }, record)
};

const SELECT_VIEW_ENUM = {
  BUY: 'BUY',
  SELL: 'SELL',
};

const VIEW_TYPE_BUTTONS = Immutable.List([
  {
    id: SELECT_VIEW_ENUM.BUY,
    displayName: 'Buy',
  },
  {
    id: SELECT_VIEW_ENUM.SELL,
    displayName: 'Sell',
  },
])

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
};

const INITIAL_STATE = Immutable.fromJS({
  view: {
    selectedView: SELECT_VIEW_ENUM.BUY,
    buttonDetails: VIEW_TYPE_BUTTONS,
  },
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
    images: [],
  },
});

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SEARCH_ACTION_ENUM.SEARCH:
      return state;
      break;
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
      break;
    case SEARCH_ACTION_ENUM.SEARCH_FAILURE:
      return state.setIn(['search', 'feedbackMessage'], action.payload.feedback)
               .setIn(['search', 'feedbackType'], action.payload.type);
      break;
     case SEARCH_ACTION_ENUM.SEARCH_SUGGEST:
      return state;
      break;
    case SEARCH_ACTION_ENUM.SEARCH_SUGGEST_SUCCESS:
      let suggestions = [];
      if (action.payload.suggestions) {
          suggestions = action.payload.suggestions.map((name, id) => {
              return Immutable.Map({ name, id });
          });
      }

      return state.setIn(['suggestions', 'items'], Immutable.List(suggestions))
              .setIn(['suggestions', 'selectedId'], 0)
              .setIn(['search', 'feedbackMessage'], null)
              .setIn(['search', 'feedbackType'], null)
              .setIn(['search', 'query'], action.payload.query);
      break;
    case SEARCH_ACTION_ENUM.SEARCH_SUGGEST_FAILURE:
      return state.setIn(['search', 'feedbackMessage'], action.payload.feedback)
               .setIn(['search', 'feedbackType'], action.payload.type)
               .setIn(['search', 'query'], action.payload.query)
               .setIn(['suggestions', 'selectedId'], 0)
               .setIn(['suggestions', 'items'], Immutable.List([]));
      break;
    case SEARCH_ACTION_ENUM.SEARCH_SUGGEST_CHANGED:
      const selectedId = action.payload.selectedId;
      return state.setIn(['suggestions', 'selectedId'], selectedId)
                .setIn(['search', 'query'], state.getIn(['suggestions', 'items', selectedId, 'name']));
      break;
    case SEARCH_ACTION_ENUM.SEARCH_SUGGEST_ITEM_SELECTED:
      return state.setIn(['suggestions', 'selectedId'], 0)
                .setIn(['suggestions', 'items'], Immutable.List([]))
                .setIn(['search', 'query'], state.getIn(['suggestions', 'items', action.payload.selectedId, 'name']));
      break;
    case SEARCH_ACTION_ENUM.SEARCH_RESULT_ITEM_SELECTED:
        const selectedRecord = state.getIn(['search', 'results']).find((record) => {
          return action.payload.selectedId === record.id;
        }) || Immutable.Map({});

        return state.set('auctionDetails',  Immutable.Map(selectedRecord));
      break;
    case SEARCH_ACTION_ENUM.BUY_SELL_VIEW_TOGGLED:
      return state.setIn(['view', 'selectedView'], state.getIn(['view', 'selectedView']) === SELECT_VIEW_ENUM.BUY 
        ? SELECT_VIEW_ENUM.SELL : SELECT_VIEW_ENUM.BUY);
      break;
  }

  return state;
};

export default reducer;