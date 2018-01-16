import React from 'react';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import { connect } from 'react-redux';

class Preview extends React.Component {

  constructor(props) {
    super(props);
    this.props.actions.requestPuzzle();
  }

  render() {
    return (
      <p>Preview</p>
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
