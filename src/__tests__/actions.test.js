import * as actions from '../actions';
import * as types from '../actions/types';

describe('typeWord action creator', () => {

    it('should create a TYPE_WORD action', () => {
        const action = actions.typeWord();
        expect(action.type).toEqual(types.TYPE_WORD);
    });

    it('should include the word in the action payload', () => {
        const word = "someword",
        action = actions.typeWord(word);
        expect(action.payload.word).toBe(word);
    });
});

describe('submitWord action creator', () => {

    it('should create a SUBMIT_WORD action', () => {
        const action = actions.submitWord();
        expect(action.type).toBe(types.SUBMIT_WORD);
    });
});

describe('removeWord action creator', () => {

    it('should create a REMOVE_WORD action', () => {
        const action = actions.removeWord();
        expect(action.type).toBe(types.REMOVE_WORD);
    });

    it('should include the word in the action payload', () => {
        const word = "someword",
        action = actions.removeWord(word);
        expect(action.payload.word).toBe(word);
    });
});

describe('circleWord action creator', () => {

    it('should create a CIRCLE_WORD action', () => {
        const action = actions.circleWord();
        expect(action.type).toBe(types.CIRCLE_WORD);
    });

    it('should include the word in the action payload', () => {
        const word = "someword",
        action = actions.circleWord(word);
        expect(action.payload.word).toBe(word);
    });
});

describe('setGridSize action creator', () => {

    it('should create a SET_GRID_SIZE action', () => {
        const action = actions.setGridSize();
        expect(action.type).toBe(types.SET_GRID_SIZE);
    });

    it('should include the grid size in the action payload', () => {
        const size = 42,
        action = actions.setGridSize(size);
        expect(action.payload.size).toBe(size);
    });
});

describe('switchLanguage action creator', () => {

    it('should create a SWITCH_LANGUAGE action', () => {
        const action = actions.switchLanguage();
        expect(action.type).toBe(types.SWITCH_LANGUAGE);
    });

    it('should include the language code in the action payload', () => {
        const langCode = 'PL',
        action = actions.switchLanguage(langCode);
        expect(action.payload.langCode).toBe(langCode);
    });
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
        state.settings.touched = false;
        runCreator();
        expect(generatePuzzle).toHaveBeenCalledTimes(0);
    });

    it('should not dispatch any action if words and grid are untouched', () => {
        state.words.touched = false;
        state.settings.touched = false;
        runCreator();
        expect(dispatch).toHaveBeenCalledTimes(0);
    });

    it('should call the puzzle generator if words and/or grid is touched', ()=> {
        runCreator();
        expect(generatePuzzle).toHaveBeenCalledTimes(1);
    });

    it('should call the puzzle generator with the right arguments', () => {
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
        state.settings.gridSize.current = gridSize;

        runCreator();
        expect(generatePuzzle).toHaveBeenCalledWith(gridSize, wordListFinal, charset);
    });

    it('should dispatch a PENDING action', () => {
        runCreator();
        return mockPromise.then(() => {
            const {type} = dispatch.mock.calls[0][0];
            expect(type).toBe(types.PUZZLE_GENERATION_PENDING);
        });
    });

    it('should dispatch a COMPLETED action', () => {
        runCreator();
        return mockPromise.then(() => {
            const {type} = dispatch.mock.calls[1][0];
            expect(type).toBe(types.PUZZLE_GENERATION_COMPLETED);
        });
    });

    it('should include the puzzle generator result in a COMPLETED action', () => {
        mockPromise = Promise.resolve('test value');
        runCreator();
        return mockPromise.then(() => {
            const {payload} = dispatch.mock.calls[1][0];
            expect(payload.puzzle).toBe('test value');
        });
    });

});