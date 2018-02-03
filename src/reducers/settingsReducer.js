import { settings as initialState } from '../store/initialState';

export default function settingsReducer(state = initialState, action) {
    if (state.locked === true
        && action.type !== 'PUZZLE_GENERATION_COMPLETED'
        && action.type !== 'PUZZLE_GENERATION_ERROR'
    ) {
        return state;
    }

    switch (action.type) {
        case 'SET_GRID_SIZE':
            return setGridSize(state, action.payload.size);
        case 'SWITCH_LANGUAGE':
            return switchLanguage(state, action.payload.langCode);
        case 'PUZZLE_GENERATION_PENDING':
            return puzzleGenerationPending(state);
        case 'PUZZLE_GENERATION_COMPLETED':
            return puzzleGenerationCompleted(state);
        case 'PUZZLE_GENERATION_ERROR':
            return puzzleGenerationError(state);
        default:
            return state;
    }
}

function setGridSize(state, size) {
    return {
        ...state,
        touched: true,
        gridSize: {
            ...state.gridSize,
            current: size
        }
    };
}

function switchLanguage(state, langCode) {
    return {
        ...state,
        touched: true,
        language: {
            ...state.language,
            current: langCode,
            messages: state.language.allLanguages[langCode].messages
        }
    };
}

function puzzleGenerationPending(state) {
    return {
        ...state,
        locked: true
    };
}

function puzzleGenerationCompleted(state) {
    return {
        ...state,
        locked: false,
        touched: false
    };
}

function puzzleGenerationError(state) {
    return {
        ...state,
        locked: false
    };
}