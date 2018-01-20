import React from 'react';

const styles = {

  right: (cellSize, word) => {
    return {
      wrapper: {

      },
      highlight: {

      },
      className: 'right'
    };
  },

  down: (cellSize, word) => {
    return {
      wrapper: {

      },
      highlight: {

      },
      className: 'down'
    };
  },

  acrossUp: (cellSize, word) => {
    return {
      wrapper: {

      },
      highlight: {

      },
      className: 'across-up'
    };
  },

  acrossDown: (cellSize, word) => {
    return {
      wrapper: {

      },
      highlight: {

      },
      className: 'across-down'
    };
  },

};

class WordHighlight extends React.Component {

  getStyle() {

  }

  getWrapperStyle = () => {
    const {cellSize} = this.props;

    return {
      transform: `rotate(-45deg) translateX(calc(((${cellSize.percent}% * 1.4142) - ${cellSize.percent}%) / 2)) translateY(-0px)`
    };
  }

  getHighlightStyle = () => {
    const {cellSize} = this.props;

    return {
      width: `calc(100% * 1.4142 * 1.0 - ((${cellSize.percent}% * 1.4142) - ${cellSize.percent}%) - 1px)`,
      height: `calc((100% * ${cellSize.decimal}) + 0px)`, // +1px?
      top: `calc((100% * 1.0) + 0px)`,
      left: `calc((100% * 0.0) + 0px)`,
      marginTop: `calc((-100% * ${cellSize.decimal} * 0.5))`
    };
  }

  render() {
    return (
      <div className="word-search-board__highlight-wrapper--nw" style={this.getWrapperStyle()}>
        <div className="word-search-board__highlight--nw" style={this.getHighlightStyle()} />
      </div>
    );
  }

}

export default WordHighlight;
