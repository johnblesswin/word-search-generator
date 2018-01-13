import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import * as actionCreators from '../actions/wordListActions';

export default function configureStore() {
  return createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(
      thunk
    ))
  );
}
