import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import api from '../../middleware/api';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';

export default function configureStor(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk, api, createLogger()),
      DevTools.instrument()
    )
  );

  if (module.hot) {

   module.hot.accept('../reducers', () => {
     const nextRoodReducer = require('../reducers').default;
     store.replaceReducer(nextRoodReducer);
   });
  }

  return store;

}