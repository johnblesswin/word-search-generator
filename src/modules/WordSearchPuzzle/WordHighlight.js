import React from 'react';
import PropTypes from 'prop-types';

const styles = {

  horizontal: (cellSize, word) => {
    return {
      wrapper: {
        top: `${word.y * cellSize.percent}%`,
        left: `${word.x * cellSize.percent}%`
      },
      highlight: {
        width: `${word.length * cellSize.percent}%`,
        height: `calc(100% * ${cellSize.decimal} + 1px)`
      },
      className: {
        wrapper: 'WS-board-preview__highlight_wrapper--horizontal',
        highlight: 'WS-board-preview__highlight--horizontal'
      }
    };
  },

  vertical: (cellSize, word) => {
    return {
      wrapper: {
        top: `${word.y * cellSize.percent}%`,
        left: `${word.x * cellSize.percent}%`
      },
      highlight: {
        width: `calc(100% * ${cellSize.decimal} + 1px)`,
        height: `${word.length * cellSize.percent}%`
      },
      className: {
        wrapper: 'WS-board-preview__highlight_wrapper--vertical',
        highlight: 'WS-board-preview__highlight--vertical'
      }
    };
  },

  crosswiseUp: (cellSize, word) => {
    return {
      wrapper: {
        transform: `rotate(-45deg) translateX(calc(((${cellSize.percent}% * 1.4142) - ${cellSize.percent}%) / 2)) translateY(-0px)`,
        transformOrigin: `left bottom`,
        bottom: `${100 - (word.y * cellSize.percent + cellSize.percent)}%`,
        left: `calc(${word.x * cellSize.percent}% + 1px)`
      },
      highlight: {
        width: `calc(100% * 1.4142 * ${word.length * cellSize.decimal} - ((${cellSize.percent}% * 1.4142) - ${cellSize.percent}%) - 1px)`,
        height: `calc((100% * ${cellSize.decimal}) + 0px)`, // +1px?
        top: `100%`,
        left: `0`,
        marginTop: `calc((-100% * ${cellSize.decimal} * 0.5))`
      },
      className: {
        wrapper: 'WS-board-preview__highlight_wrapper--crosswise-up',
        highlight: 'WS-board-preview__highlight--crosswise-up'
      }
    };
  },

  crosswiseDown: (cellSize, word) => {
    return {
      wrapper: {
        transform: `rotate(45deg) translateX(calc(((${cellSize.percent}% * 1.4142) - ${cellSize.percent}%) / 2)) translateY(-0px)`,
        transformOrigin: `left top`,
        top: `calc(${word.y * cellSize.percent}% + 1px)`,
        left: `calc(${word.x * cellSize.percent}% + 1px)`
      },
      highlight: {
        width: `calc(100% * 1.4142 * ${word.length * cellSize.decimal} - ((${cellSize.percent}% * 1.4142) - ${cellSize.percent}%) - 1px)`,
        height: `calc((100% * ${cellSize.decimal}) + 0px)`, // +1px?
        top: `0`,
        left: `0`,
        marginTop: `calc((-100% * ${cellSize.decimal} * 0.5))`
      },
      className: {
        wrapper: 'WS-board-preview__highlight_wrapper--crosswise-down',
        highlight: 'WS-board-preview__highlight--crosswise-down'
      }
    };
  },

};

class WordHighlight extends React.Component {

  constructor(props) {
    super(props);
    this.style = this.getStyle(props.cellSize, props.word, styles);
  }

  getStyle(cellSize, {path, direction}, styles) {
    const startingCell = this.getStartingCell(path, direction),
    type = this.getAxis(direction);
    return styles[type](cellSize, {x: startingCell.x, y: startingCell.y, length: path.length});
  }

  getStartingCell(path, direction) {
    const getCompareFunction = (direction) => {
      switch (direction) {
        case 'N':
        case 'S': return (a, b) => { return a.y - b.y; }; // N & S: sort from top
        default: return (a, b) => { return a.x - b.x; };  // All other directions: sort from left
      };
    };
    // Return the topmost / leftmost cell (copy the array to avoid mutation)
    const p = [...path];
    return p.sort(getCompareFunction(direction)).shift();
  }

  getAxis(direction) {
    switch (direction) {
      case 'N':
      case 'S': return 'vertical';
      case 'W':
      case 'E': return 'horizontal';
      case 'NW':
      case 'SE': return 'crosswiseUp';
      case 'NE':
      case 'SW': return 'crosswiseDown';
    }
  }

  render() {
    const {style} = this;
    return (
      <div style={style.wrapper} className={style.className.wrapper}>
        <div style={style.highlight} className={style.className.highlight} />
      </div>
    );
  }

}

WordHighlight.propTypes = {
  word: PropTypes.shape({
    path: PropTypes.array.isRequired,
    direction: PropTypes.string.isRequired
  }).isRequired,
  cellSize: PropTypes.shape({
    percent: PropTypes.number.isRequired,
    decimal: PropTypes.number.isRequired
  }).isRequired
};

export default WordHighlight;
