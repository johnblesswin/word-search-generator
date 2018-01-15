import { combineReducers } from 'redux';
import words from './wordsReducer';
import settings from './settingsReducer';
import puzzle from './puzzleGeneratorReducer';

const rootReducer = combineReducers({
  words,
  settings,
  puzzle
});

export default rootReducer;
