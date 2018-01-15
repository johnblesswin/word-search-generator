import generateWordSearch from '../services/generateWordSearch';

export function requestPuzzle() {
  return (dispatch, getState) => {
    if(getState().grid.settings.touched || getState().words.touched) {

      dispatch({type: 'PUZZLE_IS_BEING_GENERATED'});
      generateWordSearch(/* */)
        .then(puzzle => dispatch({type: 'PUZZLE_GENERATED', payload: {puzzle}}))
        .catch(error => dispatch({type: 'ERROR_GENERATING_PUZZLE', error}));

    }
  };
}
