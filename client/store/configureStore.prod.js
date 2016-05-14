
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';
import ReduxPromise from 'redux-promise';


export default function configureStor(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(ReduxPromise, thunk, createLogger()),
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