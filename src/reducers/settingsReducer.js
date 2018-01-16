import { settings as initialState } from '../store/initialState';

export default function settingsReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_GRID_SIZE': // as it says
    case 'SWITCH_LANGUAGE': // as it says
    case 'TOGGLE_WORD_CROSSING': // as it says
    case 'PUZZLE_IS_BEING_GENERATED': // lock edit
    case 'PUZZLE_GENERATED': // unlock edit, untouch grid settings
    case 'ERROR_GENERATING_PUZZLE': // unlock edit

    default:
      return state;
  }
}
