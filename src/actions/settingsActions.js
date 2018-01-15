export function setGridSize(size) {
  return {type: 'SET_GRID_SIZE', payload: {size} };
}

export function switchLanguage(langCode) {
  return {type: 'SWITCH_LANGUAGE', langCode};
}
