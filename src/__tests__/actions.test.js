import * as actions from '../actions';

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
const dispatch = jest.fn();

// Prepare mock state

const gridSize = 42,
charset = ['🐇', '🐓', '🐦', '🐧'],
wordList = [
    {word: 'rabbit', isValid: true},
    {word: 'chicken', isValid: false},
    {word: 'bird', isValid: true},
    {word: 'penguin', isValid: true}
];

initialState.words.list = wordList;
initialState.settings.grid.size.current = gridSize;

describe('requestPuzzle action creator', () => {

    const thunk = actions.requestPuzzle();
    let state;
    const getState = () => state;

    beforeEach(() => {
        state = {...initialState};
        generatePuzzle.mockClear();
        dispatch.mockClear();
    });

    it('should not call puzzle generator if words and grid are untouched', () => {
    //    mockPromise = Promise.reject(42);
        state.words.touched = false;
        state.settings.grid.touched = false;
        thunk(dispatch, getState);

        expect(generatePuzzle).toHaveBeenCalledTimes(0);
    });

});