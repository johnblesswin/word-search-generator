import React from 'react';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import WordSearchPuzzle from '../WordSearchPuzzle';
import WordBox from './WordBox';
import { Button, Icon } from 'antd';
import './Print.css';

class Print extends React.Component {

    constructor(props) {
        super(props);
        this.props.actions.requestPuzzle();
    }

    triggerPrint = () => {
        window.print();
    }

    printablePuzzle() {
            if (!this.props.puzzle.generated) return null;
            return (
                <div className="printable">
                    <WordSearchPuzzle puzzle={this.props.puzzle.generated}/>
                    <WordBox words={this.props.words} />
                </div>
            );
    }

    render() {
            return (
                <div className="print">
                    <Button
                        type="primary"
                        icon="printer"
                        size="large"
                        onClick={this.triggerPrint}
                    >
                        {this.props.lang.PRINT_BUTTON}
                    </Button>
                    <p class="print-note">
                    {this.props.lang.PRINT_NOTE}
                    </p>
                    {this.printablePuzzle()}
                </div>
            );
    }

}

function mapStateToProps(state, ownProps) {
    return {
        lang: state.settings.language.messages,
        puzzle: state.puzzle,
        words: (state.puzzle.generated
            ? state.puzzle.generated.words.map(item => item.word)
            : [])
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Print);
