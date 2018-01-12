const initialState = {
  list: [],
  currentlyTyped: {
    word: '',
    isTooLong: false,
    isTooShort: true,
    hasInvalidChars: false,
    isValid: true,
    errors: []
  },
  letterCount: 0,
  touched: false,
  locked: false,
  errors: []
};

export default function wordsReducer(state = initialState, action) {


  switch (action.type) {
    case 'TYPE_WORD': {
      return Object.assign({}, state, {currentlyTyped: validateWord(action.payload.word)});
    }
    case 'SUBMIT_WORD': {
      const newWord = validateWord(state.currentlyTyped.word);
      if (newWord.isValid) {
        return Object.assign({}, state, {
          list: [...state.list, newWord],
          currentlyTyped: Object.assign({}, initialState.currentlyTyped),
          //letterCount: countLetters(state.list),
          touched: true
        });
      }
      break;
    }
    case 'REMOVE_WORD': {
      const newList = state.list.filter(item => item.word !== action.payload.word);
      return Object.assign({}, state, {list: newList});
    }
    case 'CIRCLE_WORD': break;
  }

  return state;
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

function typeWord(word) {

}

function submitWord() {

}

function removeWord(key) {

}

function circleWord(key) {

}
