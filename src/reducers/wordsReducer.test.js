import wordsReducer from './wordsReducer';
import { words as initialState } from '../store/initialState';
import * as actions from '../actions';

let state, action;

describe('word list reducer', () => {

  beforeEach(() => {
    state = {...initialState};
    action = null;
  });

  it('returns the initial state', () => {
    expect(
      wordsReducer(undefined, {})
    ).toEqual(
      initialState
    );
  });

  it('returns the state unchanged if the "locked" flag is set to true', () => {
    // Enable the locked flag
    state.locked = true;
    // Try typing a word
    action = actions.typeWord('word');
    state = wordsReducer(state, action);
    // Check if the state remains unchanged
    expect(state)
      .toEqual(state);
  });

  it('correctly registers the word being typed', () => {
    // Type a word
    action = actions.typeWord(' SampleWord    ');
    state = wordsReducer(state, action);
    // Check the registered word
    expect(state.currentlyTyped.word).
      toBe('sampleword'); // regiseterd as lowercase, stripped of leading and trailing whitespaces
  });

  it('does not add the submitted word if it is too long, and adds the relevant error flag', () => {
    // Limit max word length
    state.maxWordLength = 5;
    // Type aw word
    action = actions.typeWord('awordthatistoolong');
    state = wordsReducer(state, action);
    // Submit the word
    action = actions.submitWord();
    state = wordsReducer(state, action);
    // Check the word list
    expect(state.list.length)
      .toBe(0); // no words
    // Check the error flag existence
    expect(result.currentlyTyped.errors)
      .toContain('SUBMITTED_WORD_TOO_LONG');
  });

  it('does not add the submitted word if it has characters from outside the charset', () => {
    // Define the charset
    state.charset = ['a', 'b', 'c'];
    // Type a word
    action = actions.typeWord('abcd');
    state = wordsReducer(state, action);
    // Submit the word
    action = actions.submitWord();
    state = wordsReducer(state, action);
    // Check the word list
    expect(state.list)
      .toHaveLength(0); // no words
  });

  it('does not add the submitted word if it already exists', () => {
    // Type a word and add it to the list
    action = actions.typeWord('word');
    state = wordsReducer(state, action);
    action = actions.submitWord();
    state = wordsReducer(state, action);
    // Try adding the same word again
    action = actions.typeWord('word');
    state = wordsReducer(state, action);
    action = actions.submitWord();
    state = wordsReducer(state, action);
    // Check the word list
    expect(state.list)
      .toHaveLength(1); // one word only
  });

  it('adds the submitted word to the list if there are no errors, and sets the "touched" flag to true', () => {
    // Type a word and add it to the list
    action = actions.typeWord('word');
    state = wordsReducer(state, action);
    action = actions.submitWord();
    state = wordsReducer(state, action);
    // Check the word list
    expect(state.list)
      .toHaveLength(1); // one word
    // Check the touched flag
    expect(state.touched)
      .toBe(true);
  });

  it('removes the selected word from the list', () => {
    // Type a word and add it to the list
    action = actions.typeWord('word');
    state = wordsReducer(state, action);
    action = actions.submitWord();
    state = wordsReducer(state, action);
    // Check the word list
    expect(state.list.length)
      .toBe(1); // one word
    action = actions.removeWord('word');
    state = wordsReducer(state, action);
    // Check the word list
    expect(state.list)
      .toHaveLength(0); // no words
  });

  it('marks the selected word as circled, and turns off the circled flag on all the other words', () => {
    // Type a word and add it to the list
    action = actions.typeWord('word');
    state = wordsReducer(state, action);
    action = actions.submitWord();
    state = wordsReducer(state, action);
    // Type another word and add it to the list
    action = actions.typeWord('anotherword');
    state = wordsReducer(state, action);
    action = actions.submitWord();
    state = wordsReducer(state, action);
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

  it('validates the existing words against new properties', () => {
    // Type a word and add it to the list
    action = actions.typeWord('abcd');
    state = wordsReducer(state, action);
    action = actions.submitWord();
    state = wordsReducer(state, action);
    // Type another word and add it to the list
    action = actions.typeWord('abcde');
    state = wordsReducer(state, action);
    action = actions.submitWord();
    state = wordsReducer(state, action);
    // Limit max word length
    state.maxWordLength = 4;
    // The first word should still be valid:
    expect(state.list[0].isValid)
      .toBe(true);
    // The second word should not be valid:
    expect(state.list[1].isValid)
      .toBe(false);
  });

  it('switches the active charset on language change', () => {
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

});
