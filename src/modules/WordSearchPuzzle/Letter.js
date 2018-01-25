import React from 'react';
import PropTypes from 'prop-types';

class Letter extends React.PureComponent {

    getStyle = () => {
        return {
            width: `calc(${this.props.size.percent}% - 1px)`,
            height: `calc(${this.props.size.percent}% - 1px)`,
            fontSize: `${this.props.size.percent}%`
        };
    }

    render() {
        return (
            <div
                className="WS-board-preview__letter"
                style={this.getStyle()}
            >
            {this.props.character}
            </div>
        );
    }

}

Letter.propTypes = {
    character: PropTypes.string.isRequired,
    size: PropTypes.shape({
        percent: PropTypes.number.isRequired,
        decimal: PropTypes.number.isRequired
      }).isRequired
};

export default Letter;
