import { default as reducer } from '../reducers/puzzleGeneratorReducer';
import { puzzle as initialState } from '../../store/initialState';
import * as actions from '../../actions';
import * as types from '../../actions/types';

describe('puzzle generator reducer', () => {

    let state, action;

    beforeEach(() => {
        action = null;
        state = {
        ...initialState
        };
    });

    it('should return the initial state', () => {
        expect(
        reducer(undefined, {})
        ).toEqual(
        initialState
        );
    });

    it('should clear any previously generated puzzle on new puzzle request', () => {
        state.generated = 'some puzzle';
        action = {type: types.PUZZLE_GENERATION_PENDING};
        state = reducer(state, action);
        expect(state.generated).toBe(null);
    });

    it('should correctly set flags on new puzzle request', () => {
        state.isPending = false,
        state.error = true;
        action = {type: types.PUZZLE_GENERATION_PENDING};
        state = reducer(state, action);
        expect(state.isPending).toBe(true);
        expect(state.error).toBe(false);
    });
    
    it('should register the new puzzle when it is ready', () => {
        state.generated = null;
        const newPuzzle = 'new puzzle';
        action = {type: types.PUZZLE_GENERATION_COMPLETED, payload: {puzzle: newPuzzle}};
        expect(state.generated).toBe(newPuzzle);
    });

    it('should clear the isPending flag when a new puzzle is ready', () => {
        state.isPending = true;
        action = {type: types.PUZZLE_GENERATION_COMPLETED};
        state = reducer(state, action);
        expect(state.isPending).toBe(false);
    });

    it('should correctly set flags on puzzle generation error', () => {
        state.error = false;
        state.isPending = true;
        action = {type: types.PUZZLE_GENERATION_ERROR};
        state = reducer(state, action);
        expect(state.isPending).toBe(false);
        expect(state.error).toBe(true);
    });

});
