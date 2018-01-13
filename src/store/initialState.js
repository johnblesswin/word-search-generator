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

const settings = {

};

const lang = {

};

export default {
  settings,
  lang,
  words,
  grid: null
};
