import wordsReducer from './wordsReducer';
import { words as initialState } from '../store/initialState';
import * as actions from '../actions/wordListActions';

describe('word list reducer', () => {

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
    const state = {...initialState};
    const action = actions.typeWord(' SampleWord  ');
    expect(
      wordsReducer(state, action)
        .typedWord
        .word
    ).toBe('sampleword');
  });

  it('does not add the submitted word if it is too long, and adds the relevant error flag', () => {
    const state = {
      ...initialState,
      maxLength: 5};
    state.typedWord.word = 'wordthatistoolong';
    const action = actions.addWord(),
      result = wordsReducer(state, action);
    expect(result.list.length).toBe(0);
    expect(result.typedWord.errors).toContain('SUBMITTED_WORD_TOO_LONG');
  });

  it('does not add the submitted word if it has characters from outside the charset');

  it('removes any errors once a previously invalid word becomes valid');

  it('does not add the submitted word if it already exists');

  it('adds the submitted word to the list if there are no errors, and sets the "touched" flag to true');

  it('removes the selected word from the list');

  it('marks the selected word as circled, and turns off the circled flag on all the other words');

  it('validates the existing words against new properties (max lenght and charset)');

});
