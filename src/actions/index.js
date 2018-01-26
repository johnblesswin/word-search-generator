import * as types from './types';
import generatePuzzle from '../services/generatePuzzle';

export function typeWord(word) {
 	return {type: types.TYPE_WORD, payload: {word}};
}

export function submitWord() {
  	return {type: types.SUBMIT_WORD};
}

export function removeWord(word) {
	return {type: types.REMOVE_WORD, payload: {word}};
}

export function circleWord(word) {
	return {type: types.CIRCLE_WORD, payload: {word}};
}

export function setGridSize(size) {
    return {type: types.SET_GRID_SIZE, payload: {size}};
}

export function switchLanguage(langCode) {
    return {type: types.SWITCH_LANGUAGE, payload: {langCode}};
}

export function requestPuzzle() {
    return (dispatch, getState) => {
        if (getState().settings.grid.touched || getState().words.touched) {
            dispatch({type: types.PUZZLE_GENERATION_PENDING});
            generatePuzzle()
                .then(puzzle => dispatch({type: types.PUZZLE_GENERATION_COMPLETED, payload: {puzzle}}))
                .catch(error => dispatch({type: types.PUZZLE_GENERATION_ERROR, error}));
        }
    };
}

export function requestAnotherPuzzle() {
    return requestPuzzle();
}
