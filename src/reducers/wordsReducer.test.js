import wordsReducer from './wordsReducer';
import { words as initialState } from '../store/initialState';
import * as actions from '../actions/wordListActions';

describe('word list reducer', () => {

  let state, action;

  it('returns the initial state', () => {
    expect(
      wordsReducer(undefined, {})
    ).toEqual(
      initialState
    );
  });

  it('returns the state unchanged if the "locked" flag is set to true', () => {
    const state = {...initialState, locked: true};
    const action = actions.typeWord('word');
    expect(
      wordsReducer(state, action)
    ).toEqual(state);
  });

  it('correctly registers the word being typed', () => {
    state = {...initialState};
    // Type a word
    action = actions.typeWord(' SampleWord  ');
    state = wordsReducer(state, action);
    expect(
      state.currentlyTyped.word
    ).toBe(
      'sampleword'
    );
  });

  it('does not add the submitted word if it is too long, and adds the relevant error flag', () => {
    state = {...initialState};
    // Define max word length
    action = actions.changeMaxLength(5);
    state = wordsReducer(state, action);
    // Type aw word
    action = actions.typeWord('awordthatistoolong');
    state = wordsReducer(state, action);
    // Submit the word
    action = actions.submitWord();
    state = wordsReducer(state, action);
    // Check the word list
    expect(state.list.length).toBe(0);
    // Check the flag
    expect(result.typedWord.errors).toContain('SUBMITTED_WORD_TOO_LONG');
  });

  it('does not add the submitted word if it has characters from outside the charset', () => {
    state = {...initialState};
    // Define the charset
    action = actions.changeCharset(['a', 'b', 'c']);
    state = wordsReducer(state, action);
    // Type a word
    action = actions.typeWord('abcd');
    state = wordsReducer(state, action);
    // Submit the word
    action = actions.submitWord();
    state = wordsReducer(state, action);
    // Check the word list
    expect(state.list.length).toBe(0);
  });

  it('removes any errors once a previously invalid word becomes valid', () => {

  });

  it('does not add the submitted word if it already exists');

  /*

  state.list.any()

  */

  it('adds the submitted word to the list if there are no errors, and sets the "touched" flag to true');

  it('removes the selected word from the list');

  it('marks the selected word as circled, and turns off the circled flag on all the other words');

  it('validates the existing words against new properties');

});
