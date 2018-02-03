import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

class WordListItem extends React.PureComponent {

  render() {
    return (
        <div className="word-list-item">
            <span className="word-list-item__word">
                {this.props.word}
            </span>
            <Button
                type="danger"
                shape="circle"
                icon="close"
                className="word-list-item__delete-btn"
                onClick={() => this.props.remove(this.props.word)}
            />
        </div>
    );
  }

}

WordListItem.propTypes = {
    word: PropTypes.string.isRequired,
    remove: PropTypes.func.isRequired
};

export default WordListItem;
