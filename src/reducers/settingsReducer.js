import { settings as initialState } from '../store/initialState';

export default function gridSetupReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_GRID_SIZE':
      return [...state, action.word];
    default:
      return state;
  }
}
