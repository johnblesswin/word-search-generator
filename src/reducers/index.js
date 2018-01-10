import { combineReducers } from 'redux';
import wordList from './addWordsReducer';

const rootReducer = combineReducers({
  wordList
});

export default rootReducer;
