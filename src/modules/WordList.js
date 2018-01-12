import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import * as wordListActions from '../actions/wordListActions';
import { connect } from 'react-redux';
import { Input } from 'semantic-ui-react';
import WordListItem from './WordListItem';

class WordList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {typedWord: ''};

    this.submitWord = this.submitWord.bind(this);
    this.typeWord = this.typeWord.bind(this);
    this.keyDown = this.keyDown.bind(this);
    this.removeWord = this.removeWord.bind(this);
  }

  submitWord() {
    this.props.actions.submitWord();
  }

  typeWord(event, {value}) {
    this.props.actions.typeWord(value);
  }

  keyDown({keyCode}) {
    // Trigger word adding on Enter:
    if (keyCode == 13) this.submitWord();
  }

  removeWord(word) {
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
        <ul>
          {this.props.list.map(item =>
            <WordListItem key={item.word} word={item.word} remove={this.removeWord} />
          )}
        </ul>
      </React.Fragment>
    );
  }

}

/*WordList.propTypes = {
  actions: PropTypes.object.isRequired,
  words: PropTypes.array.isRequred
};*/

function mapStateToProps(state, ownProps) {
  return {
  //  state: state.words,
    currentlyTyped: state.words.currentlyTyped,
    list: state.words.list,
    count: state.words.__count
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(wordListActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WordList);
