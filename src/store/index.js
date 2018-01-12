import { createStore } from 'redux';
import rootReducer from '../reducers';

import * as actionCreators from '../actions/wordListActions';

export default function configureStore(initialState) {

  const enhancer = window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__({ actionCreators });

  return createStore(
    rootReducer,
    initialState,
    enhancer
  );
}
