import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';

class WordListItem extends React.PureComponent {

  render() {
    console.log('list item renderd!');
    return (
      <li>{this.props.word}
      <button onClick={() => this.props.remove(this.props.word)}>Delete me</button>
      </li>
    );
  }

}


export default WordListItem;
