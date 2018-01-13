export function _typeWord(word) {
  return {type: 'TYPE_WORD', payload: {word}};
}

export function submitWord(word) {
  return {type: 'SUBMIT_WORD', payload: {word}};
}

export function removeWord(word) {
  return {type: 'REMOVE_WORD', payload: {word}};
}
