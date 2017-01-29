// Load the ServiceWorker, the Cache polyfill, the manifest.json file and the .htaccess file
// import 'file?name=[name].[ext]!../serviceworker.js';
// import 'file?name=[name].[ext]!../manifest.json';
// import 'file?name=[name].[ext]!../.htaccess';

// Handle 300ms click delay on mobile
// import FastClick from 'fastclick';
// FastClick.attach(document.body);

// Check for ServiceWorker support before trying to install it
// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('/serviceworker.js').then(() => {
//     // Registration was successful
//   }).catch(() => {
//     // Registration failed
//   });
// } else {
//   // No ServiceWorker Support
// }

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createHistory from 'history/lib/createBrowserHistory';

// Import the pages
import PassagePage from './components/pages/PassagePage.react';
import HelpPage from './components/pages/HelpPage.react';
import NotFoundPage from './components/pages/NotFound.react';
import App from './components/App.react';

// Import the CSS file, which node-sass generated
import './index.css';

// Create the store with the redux-thunk middleware, which allows us
// to do asynchronous things in the actions
import rootReducer from './reducers/rootReducer';
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(rootReducer);

// Make reducers hot reloadable, see http://stackoverflow.com/questions/34243684/make-redux-reducers-and-other-non-components-hot-loadable
if (module.hot) {
  module.hot.accept('./reducers/rootReducer', () => {
    const nextRootReducer = require('./reducers/rootReducer').default;
    store.replaceReducer(nextRootReducer);
  });
}

// Restore last state
import { getLastState } from './saveState';
import { asyncRestoreState } from './actions/AppActions'
store.dispatch(asyncRestoreState(getLastState()));
import { recordPageview } from './analytics';

// Mostly boilerplate, except for the Routes. These are the pages you can go to,
// which are all wrapped in the App component, which contains the navigation etc
ReactDOM.render(
  <Provider store={store}>
    <Router
      history={createHistory()}
      onUpdate={() => { recordPageview() }}
    >
      <Route component={App}>
        <Route path="/" component={PassagePage} />
        <Route path="/help" component={HelpPage} />
        <Route path="*" component={NotFoundPage} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
