import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import * as wordListActions from '../actions/wordListActions';
import { connect } from 'react-redux';
import { Input, List } from 'semantic-ui-react';
import WordListItem from './WordListItem';

class WordList extends React.Component {

  submitWord = () => {
    this.props.actions.submitWord();
  }

  typeWord = (event, {value}) => {
    this.props.actions.typeWord(value);
  }

  keyDown = ({keyCode}) => {
    if (keyCode === 13) this.submitWord(); // Trigger submit on <Enter>
  }

  circleOutWord = (word) => {
    //this.props.actions.circleOutWord(word);
  }

  removeWord = (word) => {
    this.props.actions.removeWord(word);
  }

  render() {
    return (
      <React.Fragment>
        <Input
          size='large'
          action={{ onClick: this.submitWord,  color: 'brown', labelPosition: 'right', icon: 'add square', content: 'Add' }}
          actionPosition='left'
          placeholder='New word...'
          onChange={this.typeWord}
          onKeyDown={this.keyDown}
          value={this.props.currentlyTyped.word}
        />
        <List celled>
          {this.props.list.map(item =>
            <WordListItem key={item.word} word={item.word} remove={this.removeWord} circleOut={this.circleOutWord} />
          )}
        </List>
      </React.Fragment>
    );
  }

}

WordList.propTypes = {
  actions: PropTypes.object.isRequired,
  currentlyTyped: PropTypes.object.isRequired,
  list: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    currentlyTyped: state.words.currentlyTyped,
    list: state.words.list
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(wordListActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WordList);
