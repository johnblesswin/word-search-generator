import { puzzle as initialState } from '../store/initialState';

export default function puzzleGeneratorReducer(state = initialState, action) {
    switch (action.type) {
        case 'PUZZLE_GENERATION_PENDING':
            return puzzleIsBeingGenerated(state);
        case 'PUZZLE_GENERATION_COMPLETED':
            return puzzleGenerated(state, action.payload.puzzle);
        case 'PUZZLE_GENERATION_ERROR':
            return errorGeneratingPuzzle(state, action.error);
        default:
            return state;
    }
}

function puzzleIsBeingGenerated(state) {
    return {
        ...state,
        generated: null,
        error: false,
        isPending: true
    };
}

function puzzleGenerated(state, puzzle) {
    return {
        ...state,
        generated: puzzle,
        error: false,
        isPending: false
    };
}

function errorGeneratingPuzzle(state, error) {
    return {
        ...state,
        error: true,
        isPending: false
    };
}