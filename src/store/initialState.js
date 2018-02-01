import appConfig from '../AppConfig';
import languages from '../languages';

const defaultLang = appConfig.defaultLanguage;

export const words = {
  list: [],
  currentlyTyped: {
    word: '',
    isValid: true,
    warnings: {
      invalidChars: false,
      maxLengthExceeded: false,
      alreadyExists: false
    }
  },
  letterCount: 0,
  touched: true,
  locked: false,
  maxWordLength: appConfig.gridSize.default,
  charset: languages[defaultLang].charset,
  warnings: {
    invalidChars: false,
    maxLengthExceeded: false
  },
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
