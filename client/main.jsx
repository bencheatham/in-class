import React from 'react';
import { render } from 'react-dom';
import { hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import Root from './containers/root';
import configureStore from './store/configureStore';
import initializeUsers from './middleware/users';

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

initializeUsers(store);

render(
  <Root store={store} history={history} />,
  document.getElementById('root')
);

