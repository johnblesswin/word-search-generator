import shuffle from 'lodash.shuffle';

const DIRECTIONS = {
  N:  {x:  0, y: -1},
  NW: {x:  1, y: -1},
  W:  {x:  1, y:  0},
  SW: {x:  1, y:  1},
  S:  {x:  0, y:  1},
  SE: {x: -1, y:  1},
  E:  {x: -1, y:  0},
  NE: {x: -1, y: -1}
};

/**
 * 
 * @param {number} gridWidth number of cells (horizontally)
 * @param {Array} words words to be placed on the board
 * @param {Array} charset list of characters for random filling of empty cells
 * @returns {Object}
 */
export default function generateWordSearch(gridWidth, words, charset) {

    const grid = {
        width: gridWidth,
        cells: new Array(gridWidth * gridWidth).fill(1)
    };

    const cells = getCellProps(grid),
    emptyBoard = grid.cells.map(cell => {return cell ? null : false;}), // null = blank cell, to be filled later; false = disabled cell
    paths = getAllPaths(cells, Object.keys(DIRECTIONS)),
    sortedWords = [...words].sort((a, b) => b.length - a.length);

    const result = placeAllWords(sortedWords, paths, emptyBoard),
    boardWithWords = result.board,
    wordProps = result.wordProps,
    fullBoard = randomFill(boardWithWords, charset);

    return {
        letters: fullBoard,
        boardWidth: grid.width,
        words: wordProps
    };
}

/**
 * Note that <null> means just an empty cell (which should be filled), and <false> means a disabled cell.
 * 
 * @param {Array} board partially filled board
 * @param {Array} charset charsters to fill the board with
 * @returns {Array} board filled with characters
 */
function randomFill(board, charset) {
    return board.map(cell => {
        if (cell === false) return false; // Do not fill disabled cells.

        return cell
        ? cell
        : charset[Math.floor(Math.random() * charset.length)];
    });
}

/**
 * 
 * @param {Object} grid grid properties
 * @returns {Array} cell props (index, coords and value)
 */
function getCellProps(grid) {
    return grid.cells.reduce((all, cellValue, cellIndex) => {
        return [
        ...all,
        {
            ...cellIndexToCoords(cellIndex, grid),
            isEmpty: !cellValue,
            cellIndex
        }
        ];
    }, []);

}

/**
 * 
 * @param {Array} words all words
 * @param {Array} paths all paths
 * @param {Array} board letter board (empty)
 * @returns {(Object)} new board and a list of word positioning details
 */
function placeAllWords(words, paths, board) {
    const wordProps = [];

    words.forEach(word => {
        const result = placeWord(word, paths, board);
        if (result === false) {
        throw new Error('Could not place all words on the board.');
        }
        board = result.newBoard;
        wordProps.push(result.wordProps);
    });

    return {
        board,
        wordProps
    };
}

/**
 * 
 * @param {string} word word to put on the board
 * @param {Array} paths all paths
 * @param {Array} board letter board
 * @param {number} maxAttempts max attempts to put the word
 * @returns {(Object|boolean)} on success: new board and word positioning details; on failure: false
 */
function placeWord(word, paths, board, maxAttempts = 100) {

    const validPaths = shuffle(paths.filter(path => path.length >= word.length));
    const attempts = Math.min(maxAttempts, validPaths.length);

    for (let i = 0; i < attempts; i++) {
        const path = validPaths.pop();

        const newBoard = putWordOnBoard(word, path, board);
        if (newBoard) {
        return {
            newBoard,
            wordProps: {
            word,
            path: path.path.slice(0, word.length),
            direction: path.direction
            }
        };
        }
    }
    return false;
}

/**
 * 
 * @param {string} word word to put on the board
 * @param {Object} path path to try
 * @param {Array} board letter board
 * @returns {(Array|boolean)} on success: board with the new word; on failure: false
 */
function putWordOnBoard(word, {path, direction}, board) {
    const scratchBoard = [...board],
    cellsToCheck = Math.min(word.length, path.length);

    for (let i = 0; i < cellsToCheck; i++) {
        
        const {cellIndex} = path[i],
        letter = word[i];

        if (board[cellIndex] === letter || !board[cellIndex]) {
        scratchBoard[cellIndex] = letter;
        }
        else return false; // Failed to put the word: the cell already has a letter, but it doesn't match our current letter.
    }
    return scratchBoard;
}

/**
 * 
 * @param {Array} cells cell props
 * @param {Array} directions directions to traverse
 * @returns {Array} list of all the paths for each cell
 */
function getAllPaths(cells, directions) {
    const paths = cells.reduce((allPaths, cell) => {
        return [...allPaths, ...getAllPathsFromCell(cell, cells, directions)];
    }, []);
    paths.sort((a, b) => b.length - a.length);
    return paths;
}

/**
 * 
 * @param {Object} cell current cell props
 * @param {Array} cells all cell props
 * @param {Array} directions directions to traverse
 * @returns {Array} paths in all directions
 */
function getAllPathsFromCell(cell, cells, directions) {

    if (cell.isEmpty) return [];

    return directions.reduce((paths, direction) => {
        const path = getSinglePathFromCell(cell, cells, direction);
        if(path.length > 1) {
        paths.push({
            length: path.length,
            path,
            direction
        });
        }
        return paths;
    }, []);
}

/**
 * 
 * @param {Object} cell current cell props
 * @param {Array} cells all cell props
 * @param {string} direction direction to traverse
 * @returns {Array} longest path in the specified direction
 */
function getSinglePathFromCell(cell, cells, direction) {
    const path = [cell];
    let nextCell = cell;
    while (nextCell = getAdjacentCell(nextCell, cells, direction)) {
        path.push(nextCell);
    }
    return path;
}

/**
 * 
 * @param {Object} cell current cell props
 * @param {Array} cells all cell props
 * @param {string} direction direction to traverse
 * @return {Object} adjacent cell
 */
function getAdjacentCell(cell, cells, direction) {
    const offset = DIRECTIONS[direction];
    const adjacentCoords = {
        x: cell.x + offset.x,
        y: cell.y + offset.y
    };

    return cells.find(cell => {
        return (cell.x === adjacentCoords.x && cell.y === adjacentCoords.y && !cell.isEmpty);
    });
}

/**
 * 
 * @param {number} index cell index
 * @param {Object} grid grid properties
 * @returns {Object} cell coordinates
 */
function cellIndexToCoords(index, {cells, width}) {
    if (index >= cells.length) return false;
    return {
        x: index % width,
        y: Math.floor(index / width)
    };
}

