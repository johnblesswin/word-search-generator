import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Letter from './Letter';
import WordHighlight from './WordHighlight';
import './Board.css';

class Board extends React.Component {

    state = {
        dimensions: {
            board: {
                cols: this.props.cols,
                width: null,
                height: null
            },
            cell: {
                percent: 100 / this.props.cols,
                decimal: 1 / this.props.cols
            },
            baseFontSize: null
        }
    }

    componentDidMount() {
        this.calculateDimensions();
        window.addEventListener("resize", this.calculateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.calculateDimensions);
    }

    /**
     * To work right, the container must be a square and have explicitly defined dimensions.
     * By getting the actual width, it's possible to set its height to the same value later on.
     */
    getActualContainerWidth = () => {
        if (!this.container) return;
        return this.container.getBoundingClientRect().width;
    }

    calculateDimensions = () => {
        const {cols} = this.props,
        actualWidth = this.getActualContainerWidth();
        this.setState(state => ({
            ...state,
            dimensions: {
                ...state.dimensions,
                board: {
                    ...state.dimensions.board,
                    width: actualWidth,
                    height: actualWidth
                },
                baseFontSize: actualWidth * 0.75
            }
        }));
    }

    getStyle = () => {
        return {
            height: this.state.dimensions.board.height + 'px',
            fontSize: this.state.dimensions.baseFontSize + 'px',
            // Reveal only after the actual container size have been calculated (this prevents flickering):
            visibility: (this.state.dimensions.board.width ? 'visible' :  'hidden')
        };
    }

    getLetters = () => {
        return this.props.letters.map((character, index) => 
            <Letter
                character={character}
                key={index}
                size={this.state.dimensions.cell}
            />
        );
    }

    getWordHighlights() {
        if (this.props.highlightWords) {
            return this.props.words.map(item => 
                <WordHighlight
                    cellSize={this.state.dimensions.cell}
                    word={item}
                    key={item.word}
                />
            );
        }
    }

    render() {
        return (
            <div
                ref={(div) => { this.container = div;}}
                className="WS-board-preview"
                style={this.getStyle()}
            >
                {this.getLetters()}
                <div className="WS-board-preview__outline"></div>
                <div className="WS-board-preview__highlight_wrapper">
                    {this.getWordHighlights()}
                </div>
            </div>
        );
    }

}

Board.propTypes = {
    letters: PropTypes.arrayOf(PropTypes.string).isRequired,
    words: PropTypes.arrayOf(PropTypes.shape({
        word: PropTypes.string.isRequired,
        path: PropTypes.array.isRequired,
        direction: PropTypes.string.isRequired
    })).isRequired,
    cols: PropTypes.number.isRequired,
    highlightWords: PropTypes.bool.isRequired
};

export default Board;
