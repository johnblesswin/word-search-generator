import wordsReducer from '../../reducers/wordsReducer';
import { words as initialState } from '../../store/initialState';
import * as actions from '../../actions';
import * as types from '../../actions/types';

const helpers = {

  addWord(word, state) {
    const intermediateState = wordsReducer(state, actions.typeWord(word));
    return wordsReducer(intermediateState, actions.submitWord());
  }

};

describe('word list reducer', () => {

  let state, action;

  beforeEach(() => {
    action = null;
    state = {
      ...initialState,
      charset: initialState.charsets.EN,
      maxWordLength: 10
    };
  });

  it('should return the initial state', () => {
    expect(
      wordsReducer(undefined, {})
    ).toEqual(
      initialState
    );
  });

  it('should return the state unchanged if the "locked" flag is set to true', () => {
    state.locked = true;
    const previousState = {...state};
    action = actions.typeWord('word');
    state = wordsReducer(state, action);
    expect(state)
      .toEqual(previousState);
  });

  it.skip('should mark the selected word as circled, and turn off the circled flag on all the other words', () => {
    state = helpers.addWord('word', state);
    state = helpers.addWord('anotherword', state);
    action = actions.circleWord('word');
    state = wordsReducer(state, action);
    action = actions.circleWord('anotherword');
    state = wordsReducer(state, action);
    expect(state.list[1].isCircledOut)
      .toBe(true);
    expect(state.list[0].isCircledOut)
      .toBe(false);
  });

  describe('on type', () => {
    it('should correctly register the word being typed', () => {
      action = actions.typeWord(' SampleWord    ');
      state = wordsReducer(state, action);
      expect(state.currentlyTyped.word).
        toBe('sampleword');
    });

    it('should lose the alreadyExists flag', () => {
      state = helpers.addWord('word', state);
      state = helpers.addWord('word', state);
      action = actions.typeWord('wor');
      state = wordsReducer(state, action);
      expect(state.currentlyTyped.warnings.alreadyExists)
        .not.toBe(true);
    });
  });

  describe('on submit', () => {

    it('should not add a word with characters from outside the charset', () => {
      state.charset = ['a', 'b', 'c'];
      state = helpers.addWord('abcd', state);
      expect(state.list)
        .toHaveLength(0);
    });

    it('should set the relevant warning flag if the word has characters from outside the charset', () => {
      state.charset = ['a', 'b', 'c'];
      state = helpers.addWord('abcd', state);
      expect(state.currentlyTyped.warnings.invalidChars)
        .not.toBe(false);
    });

    it('should not add the word if too long', () => {
      state.maxWordLength = 5;
      state = helpers.addWord('supercalifragilisticexpialidocious', state);
      expect(state.list)
        .toHaveLength(0);
    });

    it('should add the submitted word to the list, and set the "touched" flag to true', () => {
      state.touched = false;
      state = helpers.addWord('word', state);
      expect(state.list)
        .toHaveLength(1);
      expect(state.touched)
        .toBe(true);
    });

    it('should not add a word shorther than 2 characters', () => {
      state = helpers.addWord('a', state);
      expect(state.list)
        .toHaveLength(0);
    });

    describe('if the word already exists', () => {
      it('should not add the word if it already exists', () => {
        state = helpers.addWord('word', state);
        state = helpers.addWord('word', state);
        expect(state.list)
          .toHaveLength(1);
      });
  
      it('should enable the alreadyExists flag on the currently typed word', () => {
        state = helpers.addWord('word', state);
        state = helpers.addWord('word', state);
        expect(state.currentlyTyped.warnings.alreadyExists)
          .toBe(true);
      });

      it('should set the relevant warning', () => {
        state = helpers.addWord('word', state);
        state = helpers.addWord('word', state);
        expect(state.currentlyTyped.warnings.alreadyExists)
          .toBe(true);
      });
    });
  });

  describe('on removal', () => {
    it('should remove the word', () => {
      state = helpers.addWord('word', state);
      expect(state.list.length)
        .toBe(1);
      action = actions.removeWord('word');
      state = wordsReducer(state, action);
      expect(state.list)
        .toHaveLength(0);
    });

    it('should enable the "touched" flag', () => {
      state = helpers.addWord('word', state);
      state.touched = false;
      action = actions.removeWord('word');
      state = wordsReducer(state, action);
      expect(state.touched)
        .toBe(true);
    });
  });

  describe('on grid size change', () => {

    it('should correctly set maxWordLength', () => {
      action = actions.setGridSize(25);
      state = wordsReducer(state, action);
      expect(state.maxWordLength)
        .toBe(25);
    });

    it('should re-validate the existing words', () => {
      state = helpers.addWord('abcde', state);
      state = helpers.addWord('abcdef', state);
      action = actions.setGridSize(5);
      state = wordsReducer(state, action);
      expect(state.list[0].isValid)
        .toBe(true);
      expect(state.list[1].isValid)
        .toBe(false);
    });

    it('should enable a top-level warning flag on re-validation error', () => {
      state = helpers.addWord('abcde', state);
      state = helpers.addWord('abcdef', state);
      action = actions.setGridSize(5);
      state = wordsReducer(state, action);
      expect(state.warnings.maxLengthExceeded)
        .toBe(true);
    });
  });

  describe('on language change', () => {
    it('should switch the active charset', () => {
      action = actions.switchLanguage('PL');
      state = wordsReducer(state, action);
      expect(state.charset)
        .toEqual(state.charsets.PL);
      action = actions.switchLanguage('EN');
      state = wordsReducer(state, action);
      expect(state.charset)
        .toEqual(state.charsets.EN);
    });

    it('should re-validate the existing words', () => {
      action = actions.switchLanguage('PL');
      state = wordsReducer(state, action);
      state = helpers.addWord('aąbćdeę', state);
      action = actions.switchLanguage('EN');
      state = wordsReducer(state, action);
      expect(state.list[0].isValid)
        .toBe(false);
    });

    it('should enable a top-level warning flag on re-validation error', () => {
      action = actions.switchLanguage('PL');
      state = wordsReducer(state, action);
      state = helpers.addWord('aąbćdeę', state);
      action = actions.switchLanguage('EN');
      state = wordsReducer(state, action);
      expect(state.warnings.invalidChars)
        .toBe(true);
    });
  });

  describe('while the puzzle is being generated', () => {
    it('should lock', () => {
      state.locked = false;
      state = wordsReducer(state, {type: 'PUZZLE_GENERATION_PENDING'});
      expect(state.locked)
        .toBe(true);
    });
  });

  describe('on puzzle generation success', () => {
    it('should unlock', () => {
      state.locked = true;
      state = wordsReducer(state, {type: types.PUZZLE_GENERATION_COMPLETED});
      expect(state.locked)
        .toBe(false);
    });

    it('should disable the "touched" flag', () => {
      state.touched = true;
      state = wordsReducer(state, {type: types.PUZZLE_GENERATION_COMPLETED});
      expect(state.touched)
        .toBe(false);
    });
  });

  describe('on puzzle generation error', () => {
    it('should unlock', () => {
      state.locked = true;
      state = wordsReducer(state, {type: types.PUZZLE_GENERATION_ERROR});
      expect(state.locked)
        .toBe(false);
    });

    it('should retain the "touched" flag', () => {
      state.locked = true;
      state.touched = true;
      state = wordsReducer(state, {type: types.PUZZLE_GENERATION_ERROR});
      expect(state.touched)
        .toBe(true);
    });
  });

});
