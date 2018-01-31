import { puzzle as initialState } from '../store/initialState';

export default function puzzleGeneratorReducer(state = initialState, action) {
  switch (action.type) {
    case 'PUZZLE_IS_BEING_GENERATED':
      return puzzleIsBeingGenerated(state);
    case 'PUZZLE_GENERATED':
      return puzzleGenerated(state, action.payload.puzzle);
    case 'ERROR_GENERATING_PUZZLE':
      return errorGeneratingPuzzle(state, action.error);
    default:
      return state;
  }
}

function puzzleIsBeingGenerated(state) {
  return state;
}

function puzzleGenerated(state, puzzle) {
  return state;
}

function errorGeneratingPuzzle(state, error) {
  return state;
}