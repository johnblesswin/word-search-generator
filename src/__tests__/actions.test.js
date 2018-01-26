import * as actions from '../actions';
import * as types from '../actions/types';

describe('typeWord action creator', () => {

    it('creates the action properly');

});

// Prepare spy functions
import * as initialState from '../store/initialState';
import generatePuzzle from '../services/generatePuzzle';
jest.mock(
    '../services/generatePuzzle',
    () => jest.fn(() => mockPromise)
);
let mockPromise;

describe('requestPuzzle action creator', () => {

    const thunk = actions.requestPuzzle(),
    dispatch = jest.fn(),
    getState = () => state,
    runCreator = () => thunk(dispatch, getState);

    let state;

    beforeEach(() => {
        generatePuzzle.mockClear();
        dispatch.mockClear();
        state = {...initialState};
        state.words.touched = true;
        mockPromise = Promise.resolve();
    });

    it('should not call the puzzle generator if words and grid are untouched', () => {
        state.words.touched = false;
        state.settings.grid.touched = false;
        runCreator();
        expect(generatePuzzle).toHaveBeenCalledTimes(0);
    });

    it('should not dispatch any action if words and grid are untouched', () => {
        state.words.touched = false;
        state.settings.grid.touched = false;
        runCreator();
        expect(dispatch).toHaveBeenCalledTimes(0);
    });

    it.skip('should call the puzzle generator if words and/or grid is touched', ()=> {
        runCreator();
        expect(generatePuzzle).toHaveBeenCalledTimes(1);
    });

    it.skip('should call the puzzle generator with the right arguments', () => {
        const gridSize = 42,
        charset = ['🐇', '🐓', '🐦', '🐧'],
        wordList = [
            {word: 'rabbit', isValid: true},
            {word: 'chicken', isValid: false},
            {word: 'bird', isValid: true},
            {word: 'penguin', isValid: true}
        ],
        wordListFinal = ['rabbit', 'bird', 'penguin'];

        state.words.charset = charset;
        state.words.list = wordList;
        state.settings.grid.size.current = gridSize;

        runCreator();
        expect(generatePuzzle).toHaveBeenCalledWith(gridSize, wordListFinal, charset);
    });

    it.skip('should dispatch a PENDING action', () => {
        runCreator();
        return mockPromise.then(() => {
            const {type} = dispatch.mock.calls[0][0];
            expect(type).toEqual('PUZZLE_GENERATION_PENDING');
        });
    });

    it.skip('should dispatch a COMPLETED action', () => {
        runCreator();
        return mockPromise.then(() => {
            const {type} = dispatch.mock.calls[1][0];
            expect(type).toEqual('PUZZLE_GENERATION_COMPLETED');
        });
    });

    it.skip('should include the puzzle generator result in a COMPLETED action', () => {
        mockPromise = Promise.resolve('test value');
        runCreator();
        return mockPromise.then(() => {
            const {payload} = dispatch.mock.calls[1][0];
            expect(payload.puzzle).toEqual('test value');
        });
    });

});