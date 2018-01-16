import generateWordSearch from '../services/generateWordSearch';

export function typeWord(word) {
  return {type: 'TYPE_WORD', payload: {word}};
}

export function submitWord(word) {
  return {type: 'SUBMIT_WORD'};
}

export function removeWord(word) {
  return {type: 'REMOVE_WORD', payload: {word}};
}

export function circleWord(word) {
  return {type: 'CIRCLE_WORD', payload: {word}};
}

export function setGridSize(size) {
  return {type: 'SET_GRID_SIZE', payload: {size}};
}

export function switchLanguage(langCode) {
  return {type: 'SWITCH_LANGUAGE', payload: {langCode}};
}

export function requestPuzzle() {
  return (dispatch, getState) => {
    if(getState().settings.grid.touched || getState().words.touched) {

      dispatch({type: 'PUZZLE_IS_BEING_GENERATED'});
      generateWordSearch(/* */)
        .then(puzzle => dispatch({type: 'PUZZLE_GENERATED', payload: {puzzle}}))
        .catch(error => dispatch({type: 'ERROR_GENERATING_PUZZLE', error}));

    }
  };
}
