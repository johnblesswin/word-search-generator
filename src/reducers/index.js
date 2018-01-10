import { combineReducers } from 'redux';
import words from './addWordsReducer';

const rootReducer = combineReducers({
  words
});

export default rootReducer;
