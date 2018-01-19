import { default as reducer } from './puzzleGeneratorReducer';
import { puzzle as initialState } from '../store/initialState';
import * as actions from '../actions';

describe('puzzle generator reducer', () => {

  let state, action;

  beforeEach(() => {
    action = null;
    state = {
      ...initialState
    };
  });

  it('returns the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(
      initialState
    );
  });

  it('clears any previously generated puzzle on new puzzle request');
  it('correctly sets flags on new puzzle request');
  it('registers new puzzle when it is ready');
  it('correctly sets flags when a new puzzle is ready');
  it('correctly sets flags on puzzle generation error');

});
