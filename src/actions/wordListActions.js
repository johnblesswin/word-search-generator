export function typeWord(word) {
  return {type: 'TYPE_WORD', payload: {word}};
}

export function submitWord(word) {
  return {type: 'SUBMIT_WORD', payload: {word}};
}

export function removeWord(word) {
  return {type: 'REMOVE_WORD', payload: {word}};
}

export function circleWord(word) {
  return {type: 'CIRCLE_WORD', payload: {word}};
}

export function changeMaxLength(length) {
  return {type: 'CHANGE_MAX_LENGTH', payload: {length}};
}

export function changeCharset(charset) {
  return {type: 'CHANGE_CHARSET', payload: {charset}};
}
