import { puzzle as initialState } from '../store/initialState';

export default function puzzleGeneratorReducer(state = initialState, action) {
  switch (action.type) {
    case 'PUZZLE_IS_BEING_GENERATED':
      return puzzleIsBeingGenerated(state);
    case 'PUZZLE_GENERATED':
      return puzzleGenerated(action.puzzle);
    case 'ERROR_GENERATING_PUZZLE':
      return errorGeneratingPuzzle(action.error);
    default:
      return state;
  }
}

function puzzleIsBeingGenerated(state) {

}

function puzzleGenerated(puzzle) {}

function errorGeneratingPuzzle(error) {

}