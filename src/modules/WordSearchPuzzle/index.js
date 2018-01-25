import React from 'react';
import Board from './Board';

// TO BE REMOVED
import generateWordSearch from '../../services/generatePuzzle/wordSearchGenerator';
const charset = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'x', 'q', 'v', 'w', 'y', 'z'];
const words = ['rainy', 'snow', 'sunny', 'wind', 'chilly', 'freezing', 'skiing', 'chinchilla', 'hamster', 'rabbit', 'honeymoon',
'magazine', 'newspaper', 'computer', 'jarring', 'petulence', 'comparison', 'mismatching', 'scarcity', 'obesity', 'masterrace', 'serfdom',
'sorcerer', 'magic', 'wand', 'spell', 'deatheater', 'wizard', 'dreaming', 'planet', 'wolverine', 'collapsing', 'mountains', 'minstrel',
'galaxy'];
const sampleData = generateWordSearch(60, words, charset);

class WordSearchPuzzle extends React.Component {

  render() {
    return (
      <div>
        <Board 
          letters={sampleData.letters}
          words={sampleData.words}
          cols={sampleData.boardWidth}
          highlightWords={true}
        />
      </div>
    );
  }

}

export default WordSearchPuzzle;
