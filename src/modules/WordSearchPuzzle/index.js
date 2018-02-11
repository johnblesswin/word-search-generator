import React from 'react';
import Board from './Board';

class WordSearchPuzzle extends React.Component {

    render() {
        const {puzzle} = this.props;
        return (
        <div>
            <Board 
                letters={puzzle.letters}
                words={puzzle.words}
                cols={puzzle.boardWidth}
                highlightWords={true}
            />
        </div>
        );
    }

}

export default WordSearchPuzzle;
