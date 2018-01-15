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
  touched: true,
  locked: false,
  maxLength: 100 / appConfig.gridCell.default,
  charset: languages[appConfig.defaultLanguage].charset,
  errors: []
};

export const settings = {
  grid: {
    cell: {
      min: appConfig.gridCell.min,
      max: appConfig.gridCell.max,
      size: appConfig.gridCell.default,
    },
    touched: true
  },
  language: {
    current: appConfig.defaultLanguage,
    messages: languages[appConfig.defaultLanguage].messages,
    languages: languages
  }
};

export const puzzle = {};
