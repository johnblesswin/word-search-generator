import React from 'react';
import Board from './Board';

// TO BE REMOVED
import { sampleData } from '../../services/generatePuzzle/wordSearchGenerator';

class WordSearchPuzzle extends React.Component {

  render() {
    return (
      <div>
        <Board 
          letters={sampleData.cells}
          words={sampleData.words}
          cols={sampleData.boardWidth}
          highlightWords={true}
        />
      </div>
    );
  }

}

export default WordSearchPuzzle;
