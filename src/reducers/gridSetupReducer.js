export default function gridSetupReducer(state = [], action) {
  switch (action.type) {
    case 'SET_GRID_SIZE':
      return [...state, action.word];
    default:
      return state;
  }
}
