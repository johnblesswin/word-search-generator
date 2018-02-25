export const name = 'English';

export const charset = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'x', 'q', 'u', 'v', 'w', 'y', 'z'];

export const messages = {

    HEADER_TITLE: "word search printable generator",
    PAGE_TITLE: "Word Search Generator",

    /* menu & navigation buttons */
    MENU_SETUP_GRID: "Set grid size",
    MENU_ADD_WORDS: "Add words",
    MENU_PREVIEW: "Preview",
    MENU_PRINT: "Print",
    NAV_BACK: "Back",
    NAV_NEXT: "Next",

    /* word input warnings */
    SUBMITTED_WORD_ALREADY_EXISTS: "The word is already on the list.",
    SUBMITTED_WORD_TOO_SHORT: "The word is too short",
    SUBMITTED_WORD_TOO_LONG: "The word is too long and won’t fit the board",
    SUBMITTED_WORD_HAS_INVALID_CHAR: "Invalid character: ",
    SUBMITTED_WORD_HAS_INVALID_CHARS: "Invalid characters: ",

    /* word list warnings */
    WORD_TOO_LONG: "This word is too long.",
    WORD_HAS_INVALID_CHAR: "Invalid character: ",
    WORD_HAS_INVALID_CHARS: "Invalid characters: ",

    /* general notifications */
    PUZZLE_READY: "Your word search puzzle is ready!",
    PUZZLE_ERROR: "Error generating word search puzzle :(",
    MAX_WORD_LENGTH_EXCEEDED: "Some words are too long and won't be included. Check the word list.",
    INVALID_CHARS_FOUND: "Some words have invalid characters and won't be included. Check the word list.",
};
