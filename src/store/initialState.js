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
  maxWordLength: appConfig.gridSize.default,
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
  touched: true,
  locked: false,
  gridSize: {
    min: appConfig.gridSize.min,
    max: appConfig.gridSize.max,
    current: appConfig.gridSize.default
  },
  language: {
    current: appConfig.defaultLanguage,
    messages: languages[defaultLang].messages,
    languages: languages
  }
};

export const puzzle = {
  isPending: false,
  error: false,
  generated: null
};
