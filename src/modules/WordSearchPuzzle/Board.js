import React from 'react';
import ReactDOM from 'react-dom';
import Letter from './Letter';
import WordHighlight from './WordHighlight';
import './Board.css';

class Board extends React.Component {

    componentWillMount() {
        /*
        *  At this point it's impossible to calculate all the dimensions the component needs.
        *  This will be completed after mounting.
        */
        this.calculateDimensions();
    }

    componentDidMount() {
        /* 
        *  Using setTimeout() is just a workaround: otherwise in some circumstances it's impossible to get the actual
        *  computed width of the container element (e.g. when the component is rendered right after entering/refreshing
        *  the page).
        */
        setTimeout(this.calculateDimensions, 0);

        window.addEventListener("resize", this.calculateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.calculateDimensions);
    }

    getActualContainerWidth = () => {
        if (!this.container) return;
            let width = window.getComputedStyle(this.container).getPropertyValue('width');
        if ( (width = parseInt(width, 10)) && !isNaN(width) ) {
            return width;
        }
    }

    calculateDimensions = () => {
        const {cols} = this.props,
        actualWidth = this.getActualContainerWidth(),
        dimensions = {
        board: {
            cols: cols,
            width: actualWidth,
            height: actualWidth
        },
        cell: {
            percent: 100 / cols,
            decimal: 1 / cols
        },
        baseFontSize: actualWidth * 0.75
        };
        this.setState({dimensions});
    }

  getStyle = () => {
    return {
      height: this.state.dimensions.board.height + 'px',
      fontSize: this.state.dimensions.baseFontSize + 'px',
      visibility: (this.state.dimensions.board.width ? 'visible' :  'hidden') // Reveal only after the actual container dimensions have been calculated.
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
                className="WS-board"
                style={this.getStyle()}
            >
                {this.getLetters()}
                {this.getWordHighlights()}
            </div>
        );
    }

}

export default Board;
