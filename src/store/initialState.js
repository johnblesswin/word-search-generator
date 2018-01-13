import appConfig from '../AppConfig';
import languages from '../languages';

const words = {
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
  errors: []
};

const grid = {
  cell: {
    min: appConfig.gridCell.min,
    max: appConfig.gridCell.max,
    size: appConfig.gridCell.default,
  },
};

const lang = {
  messages: languages[appConfig.defaultLanguage].messages,
  current: appConfig.defaultLanguage,
  languages: languages
};

export default {
  lang,
  words,
  grid
};
