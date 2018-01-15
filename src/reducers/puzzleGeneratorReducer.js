import { puzzle as initialState } from '../store/initialState';

export default function puzzleGeneratorReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_GRID_SIZE':
    default:
      return state;
  }
}
