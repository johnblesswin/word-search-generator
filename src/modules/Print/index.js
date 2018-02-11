import React from 'react';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import WordSearchPuzzle from '../WordSearchPuzzle';
import './Print.css';

class Print extends React.Component {

  constructor(props) {
    super(props);
    this.props.actions.requestPuzzle();
  }

  render() {
        if (!this.props.puzzle.generated) {
            return <p>Generating puzzle...</p>;
        }
        return (
            <div className="printable">
                <WordSearchPuzzle puzzle={this.props.puzzle.generated}/>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Print);
