import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import { CSSTransitionGroup } from 'react-transition-group';
import { Button, Input, Form } from 'antd';
import WordListItem from './WordListItem';

class WordList extends React.Component {

    submitWord = () => {
        this.props.actions.submitWord();
    }

    //typeWord = (event, {value}) => {
    typeWord = (e) => {
        this.props.actions.typeWord(e.target.value);
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

        const items = this.props.list.map(item => {return <div key={item.word}>{item.word}</div>;});

        return (
            <React.Fragment>


                <Form layout="inline">
                    <Form.Item
                        label=""
                        validateStatus=""
                    >
                    <Input
                        placeholder="Add word..."
                        value={this.props.currentlyTyped.word}
                        onPressEnter={this.keyDown}
                        onChange={this.typeWord}
                        size="large"
                        id="add-word" />
                    </Form.Item>
                    <Button
                        onClick={this.submitWord}
                        type="primary"
                        shape="circle"
                        icon="plus"
                        size="large"
                    />
                </Form>

                {items}

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
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(WordList);
