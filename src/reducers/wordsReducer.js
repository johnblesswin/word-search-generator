import { words as initialState } from '../store/initialState';
import difference from "lodash/difference";

export default function wordsReducer(state = initialState, action) {
    if (state.locked === true
        && action.type !== 'PUZZLE_GENERATION_COMPLETED'
        && action.type !== 'PUZZLE_GENERATION_ERROR'
    ) {
        return state;
    }

    switch (action.type) {
        case 'TYPE_WORD': return typeWord(state, action.payload.word);
        case 'SUBMIT_WORD': return submitWord(state, state.currentlyTyped.word);
        case 'REMOVE_WORD': return removeWord(state, action.payload.word);
        case 'CIRCLE_WORD': return circleWord(state, action.payload.word);
        case 'SWITCH_LANGUAGE': return switchLanguage(state, action.payload.langCode);
        case 'SET_GRID_SIZE': return setGridSize(state, action.payload.size);
        case 'PUZZLE_GENERATION_PENDING': return puzzleIsBeingGenerated(state);
        case 'PUZZLE_GENERATION_COMPLETED': return puzzleGenerated(state);
        case 'PUZZLE_GENERATION_ERROR': return errorGeneratingPuzzle(state);
        default: return state;
    }
}

function countLetters(words) {
    return 0;
};

function validateWord(word, maxLength, allowedChars) {

    word = word.trim();

    const isTooLong = !(word.length <= maxLength),
          hasInvalidChars = validateWordAgainstCharset(word, allowedChars);

    return {
        word,
        isValid: !(isTooLong || hasInvalidChars),
        warnings: {
            invalidChars: hasInvalidChars,
            maxLengthExceeded: isTooLong
        }
    };
}

function validateWordAgainstCharset(word, charset) {
    const forbiddenChars = difference(word.split(''), charset);
    if (forbiddenChars.length === 0) return false;
    return forbiddenChars;
}

function typeWord(state, word) {
    return {
        ...state,
        currentlyTyped: validateWord(word.toLowerCase(), state.maxWordLength, state.charset)
    };
}

function submitWord(state, word) {
    if (isTooShort(word)) return state;

    if (wordExists(word, state.list)) {
        return {
            ...state,
            currentlyTyped: {
                ...state.currentlyTyped,
                warnings: {
                    ...state.currentlyTyped.warnings,
                    alreadyExists: true
                }
            }
        };
    }

    const newWord = validateWord(word, state.maxWordLength, state.charset);
    if (newWord.isValid) {
        return {
        ...state,
        list: [...state.list, newWord],
        currentlyTyped: {
            word: '',
            isValid: true,
            warnings: {
                invalidChars: false,
                maxLengthExceeded: false
            }
        },
        letterCount: countLetters(state.list),
        touched: true
        };
    }
    return state;
}

function isTooShort(word) {
    return word.length < 2;
}

function wordExists(word, list) {
    return list.find(item => item.word === word);
}

function removeWord(state, word) {
    // touch
    return {
        ...state,
        list: state.list.filter(item => item.word !== word),
        touched: true
    };
}

function circleWord(state, word) {
    return state;
}

function switchLanguage(state, langCode) {

    const validatedList = state.list.map(item => validateWord(item.word, state.maxWordLength, state.charsets[langCode])),
          hasAnyInvalidChars = validatedList.some(item => item.warnings.invalidChars);

    return {
        ...state,
        list: validatedList,
        charset: state.charsets[langCode],
        warnings: {
            ...state.warnings,
            invalidChars: hasAnyInvalidChars
        }
    };
}

function setGridSize(state, size) {

    const validatedList = state.list.map(item => validateWord(item.word, size, state.charset)),
          isAnyTooLong = validatedList.some(item => item.warnings.maxLengthExceeded);

    return {
        ...state,
        list: validatedList,
        maxWordLength: size,
        warnings: {
            ...state.warnings,
            maxLengthExceeded: isAnyTooLong
        }
    };
}

function puzzleIsBeingGenerated(state) {
    return {
        ...state,
        locked: true
    };
}

function puzzleGenerated(state) {
    return {
        ...state,
        locked: false,
        touched: false
    };
}

function errorGeneratingPuzzle(state) {
return {
        ...state,
        locked: false
    };
}
