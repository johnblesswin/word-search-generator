import { createStore } from 'redux';
import rootReducer from '../reducers';
import * as actionCreators from '../actions/wordListActions';
import initialState from './initialState';

export default function configureStore() {

  const enhancer = window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__({ actionCreators });

  return createStore(
    rootReducer,
    initialState,
    enhancer
  );
}
