import appConfig from '../AppConfig';
import languages from '../languages';

export const words = {
  list: [],
  currentlyTyped: {
    word: '',
    isTooLong: false,
    isTooShort: true,
    hasInvalidChars: false,
    isValid: true,
    errors: []
  },
  letterCount: 0,
  touched: false,
  locked: false,
  maxLength: 100 / appConfig.gridCell.default,
  charset: languages[appConfig.defaultLanguage].charset,
  errors: []
};

export const grid = {
  cell: {
    min: appConfig.gridCell.min,
    max: appConfig.gridCell.max,
    size: appConfig.gridCell.default,
  },
};

export const lang = {
  messages: languages[appConfig.defaultLanguage].messages,
  current: appConfig.defaultLanguage,
  languages: languages
};

export default {
  lang,
  words,
  grid
};
