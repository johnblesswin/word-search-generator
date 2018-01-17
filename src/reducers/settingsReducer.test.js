import settingsReducer from './settingsReducer';
import { settings as initialState } from '../store/initialState';
import * as actions from '../actions';

describe('settings reducer', () => {

  let state, action;

  beforeEach(() => {
    action = null;
    state = {
      ...initialState
    };
  });

  it('returns the initial state', () => {
    expect(
      settingsReducer(undefined, {})
    ).toEqual(
      initialState
    );
  });

  it('correctly registers grid size changes'); // remember to test the touched flag
  it('correctly toggles the word crossing option'); // see above
  it('correctly switches the language'); // see above

  it('returns the state unchanged if the "locked" flag is set to true', () => {
    state.locked = true;
    const previousState = {...state};
    // Try...

    // Check if the state remains unchanged
    expect(state)
      .toEqual(previousState);
  });

  it('locks while the puzzle is being generated', () => {
    state.locked = false;
    state = settingsReducer(state, {type: 'PUZZLE_IS_BEING_GENERATED'});
    expect(state.locked)
      .toBe(true);
  });

  it('unlocks once the puzzle has been generated', () => {
    state.locked = true;
    state = settingsReducer(state, {type: 'PUZZLE_GENERATED'});
    expect(state.locked)
      .toBe(false);
  });

  it('disables the "touched" flag once the puzzle has been generated', () => {
    state.touched = true;
    state = settingsReducer(state, {type: 'PUZZLE_GENERATED'});
    expect(state.touched)
      .toBe(false);
  });

  it('unlocks on puzzle generator error', () => {
    state.locked = true;
    state = settingsReducer(state, {type: 'ERROR_GENERATING_PUZZLE'});
    expect(state.locked)
      .toBe(false);
  });

  it('retains the "touched" flag on puzzle generator error', () => {
    state.touched = true;
    state = settingsReducer(state, {type: 'ERROR_GENERATING_PUZZLE'});
    expect(state.touched)
      .toBe(true);
  });

});
