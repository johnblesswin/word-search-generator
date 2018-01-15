import { combineReducers } from 'redux';
import words from './wordsReducer';
import grid from './gridSetupReducer';
import lang from './languageReducer';

const rootReducer = combineReducers({
  words,
  grid,
  lang
});

export default rootReducer;
