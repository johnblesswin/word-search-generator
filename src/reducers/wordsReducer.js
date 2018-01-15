import { words as initialState } from '../store/initialState';

export default function wordsReducer(state = initialState, action) {
  if (state.locked === true) return state;
  switch (action.type) {
    case 'TYPE_WORD': return typeWord(state, action.payload.word);
    case 'SUBMIT_WORD': return submitWord(state, state.currentlyTyped.word);
    case 'REMOVE_WORD': return removeWord(state, action.payload.word);
    case 'CIRCLE_WORD': return circleWord(state, action.payload.word);
    case 'CHANGE_CHARSET': return state;
    case 'CHANGE_MAX_LENGTH': return state;
    default: return state;
  }
}

function countLetters(words) {
  // TODO
  return 0;
}

function validateWord(word, maxLength, allowedChars) {

  return {
    word,
    isTooLong: false,
    isTooShort: false,
    hasInvalidChars: false,
    isValid: true,
    errors: []
  };
}

function typeWord(state, word) {
  return {
    ...state,
    currentlyTyped: validateWord(word.toLowerCase())
  };
}

function submitWord(state, word) {
  const newWord = validateWord(word);
  if (newWord.isValid) {
    return {
      ...state,
      list: [...state.list, newWord],
      currentlyTyped: {
        word: '',
        isTooLong: false,
        isTooShort: true,
        hasInvalidChars: false,
        isValid: true,
        errors: []
      },
      letterCount: countLetters(state.list),
      touched: true
    };
  }
  return state;
}

function removeWord(state, word) {
  return {
    ...state,
    list:  state.list.filter(item => item.word !== word)
  };
}

function circleWord(state, word) {
  return state;
}
