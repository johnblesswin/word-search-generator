import React from 'react';
import PropTypes from 'prop-types';
import { List, Button } from 'semantic-ui-react';

class WordListItem extends React.PureComponent {

  render() {
    console.log('list item renderd!');

    return (
      <List.Item>
        <List.Content>
          {this.props.word} <Button icon='delete' color='red' onClick={() => this.props.remove(this.props.word)} />
        </List.Content>
      </List.Item>
    );
  }

}


export default WordListItem;
