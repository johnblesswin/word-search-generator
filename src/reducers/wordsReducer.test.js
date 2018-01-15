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
    state = {...initialState};
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
    state = {...initialState};
    // Type a word
    action = actions.typeWord(' SampleWord    ');
    state = wordsReducer(state, action);
    // Check the registered word
    expect(state.currentlyTyped.word).
      toBe('sampleword'); // regiseterd as lowercase, stripped of leading and trailing whitespaces
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
    expect(state.list.length)
      .toBe(0); // no words
    // Check the error flag existence
    expect(result.typedWord.errors)
      .toContain('SUBMITTED_WORD_TOO_LONG');
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
    expect(state.list.length)
      .toBe(0); // no words
  });

  it('does not add the submitted word if it already exists', () => {
    state = {...initialState};
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
    expect(state.list.length)
      .toBe(1); // no words
  });

  it('adds the submitted word to the list if there are no errors, and sets the "touched" flag to true', () => {
    state = {...initialState};
    // Type a word and add it to the list
    action = actions.typeWord('word');
    state = wordsReducer(state, action);
    action = actions.submitWord();
    state = wordsReducer(state, action);
    // Check the word list
    expect(state.list.length)
      .toBe(1); // one word
    // Check the touched flag
    expect(state.touched)
      .toBe(true);
  });

  it('removes the selected word from the list', () => {
    state = {...initialState};
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
    expect(state.list.length)
      .toBe(0); // no words
  });

  it('marks the selected word as circled, and turns off the circled flag on all the other words', () => {
    state = {...initialState};
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
    state = {...initialState};
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
    // Define max word length
    action = actions.changeMaxLength(5);
    state = wordsReducer(state, action);
    // The first word should still be valid:
    expect(state.list[0].isValid)
      .toBe(true);
    // The second word should not be valid:
    expect(state.list[1].isValid)
      .toBe(false);
  });

});
