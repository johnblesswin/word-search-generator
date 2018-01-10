import { combineReducers } from 'redux';
import words from './wordListReducer';

const rootReducer = combineReducers({
  words
});

export default rootReducer;
