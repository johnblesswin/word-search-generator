import React from 'react';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import { connect } from 'react-redux';
import WordSearchPuzzle from './WordSearchPuzzle';

class Preview extends React.Component {

  constructor(props) {
    super(props);
    this.props.actions.requestPuzzle();
  }

  render() {
    return (
      <WordSearchPuzzle />
    );
  }

}

function mapStateToProps(state, ownProps) {
  return {
    puzzle: state.puzzle
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Preview);
