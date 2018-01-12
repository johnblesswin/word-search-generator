const initialState = {
  list: {},
  currentlyTyped: {
    word: '',
    isTooLong: false,
    isTooShort: true,
    hasInvalidChars: false,
    errors: []
  },
  count: 0,
  touched: false,
  locked: false,
  errors: []
};

export default function wordsReducer(previousState = initialState, action) {
  state = Object.assign({}, previousState);

  switch (action.type) {
    case 'TYPE_WORD':
    case 'SUBMIT_WORD':
    case 'REMOVE_WORD':
    case 'CIRCLE_WORD':
    default:
      return state;
  }
}
