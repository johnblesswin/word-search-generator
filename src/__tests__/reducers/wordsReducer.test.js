import wordsReducer from '../../reducers/wordsReducer';
import { words as initialState } from '../../store/initialState';
import * as actions from '../../actions';
import * as types from '../../actions/types';

const helpers = {

  addWord(word, state) {
    const intermediateState = wordsReducer(state, actions.typeWord(word));
    return wordsReducer(intermediateState, actions.submitWord());
  }

};

describe('word list reducer', () => {

  let state, action;

  beforeEach(() => {
    action = null;
    state = {
      ...initialState,
      charset: initialState.charsets.EN,
      maxWordLength: 10
    };
  });

  it('should return the initial state', () => {
    expect(
      wordsReducer(undefined, {})
    ).toEqual(
      initialState
    );
  });

  it('should return the state unchanged if the "locked" flag is set to true', () => {
    state.locked = true;
    const previousState = {...state};
    // Try typing a word
    action = actions.typeWord('word');
    state = wordsReducer(state, action);
    // Check if the state remains unchanged
    expect(state)
      .toEqual(previousState);
  });

  it('should correctly register the word being typed', () => {
    // Type a word
    action = actions.typeWord(' SampleWord    ');
    state = wordsReducer(state, action);
    // Check the registered word
    expect(state.currentlyTyped.word).
      toBe('sampleword'); // regiseterd as lowercase, stripped of leading and trailing whitespaces
  });

  it('should not add the submitted word if it is too long, and should trigger the relevant warning', () => {
    // Limit max word length
    state.maxWordLength = 5;
    state = helpers.addWord('supercalifragilisticexpialidocious', state);
    // Check the word list
    expect(state.list)
      .toHaveLength(0); // no words
    // Check the error flag existence
    expect(state.currentlyTyped.warnings.maxLengthExceeded)
      .toBe(true);
  });

  it('should not add the submitted word if it has characters from outside the charset', () => {
    state.charset = ['a', 'b', 'c'];
    // Try adding a word with a letter from outside the charset
    state = helpers.addWord('abcd', state);
    // Check the word list
    expect(state.list)
      .toHaveLength(0); // no words
  });

  it('should enable the relevant warning flag if the submitted word has characters from outside the charset', () => {
    state.charset = ['a', 'b', 'c'];
    // Try adding a word with a letter from outside the charset
    state = helpers.addWord('abcd', state);
    expect(state.currentlyTyped.warnings.invalidChars)
      .toBe(true);
  });

  it('should not add the submitted word if it already exists', () => {
    // Type a word and add it to the list
    state = helpers.addWord('word', state);
    // Try adding the same word again
    state = helpers.addWord('word', state);
    // Check the word list
    expect(state.list)
      .toHaveLength(1); // one word only
  });

  it('should add the submitted word to the list, and set the "touched" flag to true', () => {
    state.touched = false;
    state = helpers.addWord('word', state);
    // Check the word list
    expect(state.list)
      .toHaveLength(1); // one word
    // Check the touched flag
    expect(state.touched)
      .toBe(true);
  });

  it('should remove the selected word from the list', () => {
    state = helpers.addWord('word', state);
    // Check the word list
    expect(state.list.length)
      .toBe(1); // one word
    action = actions.removeWord('word');
    state = wordsReducer(state, action);
    // Check the word list
    expect(state.list)
      .toHaveLength(0); // no words
  });

  it('should mark the selected word as circled, and turn off the circled flag on all the other words', () => {
    state = helpers.addWord('word', state);
    state = helpers.addWord('anotherword', state);
    // Mark the first word as circled out
    action = actions.circleWord('word');
    state = wordsReducer(state, action);
    // Mark the second word as circled out
    action = actions.circleWord('anotherword');
    state = wordsReducer(state, action);
    // Check if the second word is circled out
    expect(state.list[1].isCircledOut)
      .toBe(true);
    // Check if the first word is no longer circled out
    expect(state.list[0].isCircledOut)
      .toBe(false);
  });

  it('should correctly calculate maxWordLength', () => {
    // Set the grid size to 4: this will set maxWordSize to 25 (100/4 = 25)
    action = actions.setGridSize(20);
    state = wordsReducer(state, action);
    expect(state.maxWordLength)
      .toBe(25);
  });

  it('should validate the existing words against new properties', () => {
    // Type a five-letter word and add it to the list
    state = helpers.addWord('abcde', state);
    // Type a six-letter word and add it to the list
    state = helpers.addWord('abcdef', state);
    // Set the grid size to 20: this will set maxWordSize to 5 (100/20 = 5)
    action = actions.setGridSize(20);
    state = wordsReducer(state, action);
    // The first word should still be valid
    expect(state.list[0].isValid)
      .toBe(true);
    // The second word should not be valid
    expect(state.list[1].isValid)
      .toBe(false);
  });

  it('should switch the active charset on language change', () => {
    // Switch to PL
    action = actions.switchLanguage('PL');
    state = wordsReducer(state, action);
    expect(state.charset)
      .toEqual(state.charsets.PL);
    // Switch to EN
    action = actions.switchLanguage('EN');
    state = wordsReducer(state, action);
    expect(state.charset)
      .toEqual(state.charsets.EN);
  });

  it('should lock while the puzzle is being generated', () => {
    state.locked = false;
    state = wordsReducer(state, {type: 'PUZZLE_GENERATION_PENDING'});
    expect(state.locked)
      .toBe(true);
  });

  it('should unlock once the puzzle has been generated', () => {
    state.locked = true;
    state = wordsReducer(state, {type: types.PUZZLE_GENERATION_COMPLETED});
    expect(state.locked)
      .toBe(false);
  });

  it('should disable the "touched" flag once the puzzle has been generated', () => {
    state.touched = true;
    state = wordsReducer(state, {type: types.PUZZLE_GENERATION_COMPLETED});
    expect(state.touched)
      .toBe(false);
  });

  it('should unlock on puzzle generator error', () => {
    state.locked = true;
    state = wordsReducer(state, {type: types.PUZZLE_GENERATION_ERROR});
    expect(state.locked)
      .toBe(false);
  });

  it('should retain the "touched" flag on puzzle generator error', () => {
    state.touched = true;
    state = wordsReducer(state, {type: types.PUZZLE_GENERATION_ERROR});
    expect(state.touched)
      .toBe(true);
  });

});
