import React from 'react';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import { connect } from 'react-redux';
import GridPreview from './GridPreview';
import WordSearchPuzzle from './WordSearchPuzzle';

class Preview extends React.Component {

  constructor(props) {
    super(props);
    this.props.actions.requestPuzzle();
  }

  renderGrid() {
    return <GridPreview gridSize={this.props.gridSize} />;
  }

  renderPuzzle() {
    return <WordSearchPuzzle puzzle={this.props.puzzle.generated}/>;
  }

  render() {
    if (!this.props.puzzle.generated) return this.renderGrid();
    return this.renderPuzzle();
  }

}

function mapStateToProps(state, ownProps) {
  return {
    puzzle: state.puzzle,
    gridSize: state.settings.gridSize.current
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Preview);
