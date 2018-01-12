import { combineReducers } from 'redux';
import words from './wordsReducer';
import grid from './gridSetupReducer';

const rootReducer = combineReducers({
  words,
  grid
});

export default rootReducer;
