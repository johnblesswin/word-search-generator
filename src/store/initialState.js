import appConfig from '../AppConfig';
import languages from '../languages';

const defaultLang = appConfig.defaultLanguage;

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
  maxWordLength: 100 / appConfig.gridCell.default,
  charset: languages[defaultLang].charset,
  errors: [],
  // Extracts only charsets from the language data
  charsets: Object.keys(languages).reduce(
    (charsets, langCode) => {
      charsets[langCode] = languages[langCode].charset;
      return charsets;
    }, {}),
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
    messages: languages[defaultLang].messages,
    languages: languages
  }
};

export const puzzle = {};
