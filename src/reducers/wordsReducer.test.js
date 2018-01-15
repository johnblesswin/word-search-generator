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

    const mockState = {...initialState, locked: true};
    const mockAction = actions.typeWord('word');

    expect(
      wordsReducer(mockState, mockAction)
    ).toEqual(mockState);
  });

  it('inserts the word being typed into the new state');

  it('does not add the submitted word if it is too long, and adds the relevant error flag');

  it('does not add the submitted word if it has characters from outside the charset');

  it('removes any errors once a previously invalid word becomes valid');

  it('does not add the submitted word if it exists');

  it('adds the submitted word to the list if there are no errors, and sets the "touched" flag to true');

  it('removes the selected word from the list');

  it('marks the selected word as circled, and turns off the circled flag on all the other words');

  it('validates the existing words against new properties (max lenght and charset)');

});
