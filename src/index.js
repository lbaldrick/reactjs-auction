import EnhancedPage from './components/main/EnhancedPage.jsx';
import ReactDom from 'react-dom';
import React from 'react';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import reducers from './redux/reducers/SearchReducer';
import { Provider } from 'react-redux';

const loggerMiddleware = createLogger()

const store = createStore(
  reducers,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  )
)

class Index {

   static renderApp() {
      ReactDom.render(
      	<Provider store={store}>
      	  <EnhancedPage/>
      	</Provider>,
      	document.getElementById('app'));
   }

}

Index.renderApp();

