export default function gridSetupReducer(state = [], action) {

console.log(action);

  switch (action.type) {
    case 'SET_GRID_SIZE':
      return [...state, action.size];
    default:
      return state;
  }
}
