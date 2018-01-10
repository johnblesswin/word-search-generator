import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input } from 'semantic-ui-react';

class AddWords extends React.Component {

  constructor(props) {
    super(props);

    this.state = {typedWord: ''};

    this.addWord = this.addWord.bind(this);
    this.typeWord = this.typeWord.bind(this);
    this.keyDown = this.keyDown.bind(this);
  }

  addWord() {
    this.setState({typedWord: ''});
  }

  typeWord(event, {value}) {
    this.setState({typedWord: value});
  }

  keyDown({keyCode}) {
    // Trigger word adding on Enter:
    if (keyCode == 13) this.addWord();
  }

  render() {
    return (
      <Input
        size='large'
        action={{ onClick: this.addWord,  color: 'brown', labelPosition: 'right', icon: 'add square', content: 'Add' }}
        actionPosition='left'
        placeholder='New word...'
        onChange={this.typeWord}
        onKeyDown={this.keyDown}
        value={this.state.typedWord}
      />
    );
  }

}

AddWords.propTypes = {
  dispatch: PropTypes.func.isRequired,
  words: PropTypes.array.isRequred
};

function mapStateToProps(state, ownProps) {
  return {
    words: state.words
  };
}

//function mapDispatchToProps()

export default connect(mapStateToProps /*, mapDispatchToProps*/)(AddWords);
