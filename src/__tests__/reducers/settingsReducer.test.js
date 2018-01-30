    import reducer from '../../reducers/settingsReducer';
    import { settings as initialState } from '../../store/initialState';
    import * as actions from '../../actions';
    import * as types from '../../actions/types';

    describe('settings reducer', () => {

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

    it('should correctly register the new grid size', () => {
        action = actions.setGridSize(42);
        state = reducer(state, action);
        expect(state.gridSize.current).toBe(42);
    });

    it('should enable the "touched" flag on grid size change', () => {
        state.touched = false;
        action = actions.setGridSize(42);
        state = reducer(state, action);
        expect(state.touched).toBe(true);
    });

    it('should correctly switch the language', () => {
        state.language.current = 'EN';
        action = actions.switchLanguage('PL');
        state = reducer(state, action);
        expect(state.language.current).toBe('PL');
    });

    it('should enable the "touched" flag on language change', () => {
        state.touched = false;
        action = actions.switchLanguage('PL');
        state = reducer(state, action);
        expect(state.touched).toBe(true);
    });

    it('should return the state unchanged if the "locked" flag is set to true', () => {
        state.locked = true;
        const previousState = {...state};
        // Try changing the grid size
        action = actions.setGridSize(42);
        state = reducer(state, action);
        // Check if the state remains unchanged
        expect(state)
        .toEqual(previousState);
    });

    it('should lock while the puzzle is being generated', () => {
        state.locked = false;
        state = reducer(state, {type: types.PUZZLE_GENERATION_PENDING});
        expect(state.locked)
        .toBe(true);
    });

    it('should unlock once the puzzle has been generated', () => {
        state.locked = true;
        state = reducer(state, {type: types.PUZZLE_GENERATION_COMPLETED});
        expect(state.locked)
        .toBe(false);
    });

    it('should disable the "touched" flag once the puzzle has been generated', () => {
        state.touched = true;
        state = reducer(state, {type: types.PUZZLE_GENERATION_COMPLETED});
        expect(state.touched)
        .toBe(false);
    });

    it('should unlock on puzzle generator error', () => {
        state.locked = true;
        state = reducer(state, {type: types.PUZZLE_GENERATION_ERROR});
        expect(state.locked)
        .toBe(false);
    });

    it('should retain the "touched" flag on puzzle generator error', () => {
        state.touched = true;
        state = reducer(state, {type: types.PUZZLE_GENERATION_ERROR});
        expect(state.touched)
        .toBe(true);
    });

    });
