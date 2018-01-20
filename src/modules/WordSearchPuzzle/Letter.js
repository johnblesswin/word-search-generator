import React from 'react';

class Letter extends React.Component {

  getStyle = () => {
    return {
      width: `calc(${this.props.size.percent}% - 1px)`,
      height: `calc(${this.props.size.percent}% - 1px)`,
      fontSize: `${this.props.size.percent}%`
    };
  }

  render() {
    return (
      <div className="word-search-board__letter" style={this.getStyle()}>
        {this.props.character}
      </div>
    );
  }

}

export default Letter;
