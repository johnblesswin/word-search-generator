import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';
import { Button, Input, Form } from 'antd';
import { CSSTransitionGroup } from 'react-transition-group';
import Item from './WordListItem';
import './WordList.css';

class WordList extends React.Component {

    submitWord = () => {
        this.props.actions.submitWord();
    }

    typeWord = (e) => {
        this.props.actions.typeWord(e.target.value);
    }

    keyDown = ({keyCode}) => {
        if (keyCode === 13) this.submitWord(); // Trigger submit on <Enter>
    }

    removeWord = (word) => {
        this.props.actions.removeWord(word);
    }

    getList() {
        const list = [...this.props.list].reverse();

        if (!list.length) {
            return this.getEmptyListInfo();
        }

        return (
            <CSSTransitionGroup
                component="div"
                className="word-list__list"
                transitionName="word"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}
            >
                {list.map(item => (
                    <Item
                        word={item.word}
                        key={item.word}
                        remove={this.removeWord}
                    >
                        {item.word}
                    </Item>
                ))}
            </CSSTransitionGroup>
        );
    }

    getEmptyListInfo() {
        return (
            <div className="word-list__empty-list-info">
                [the list is empty]
            </div>
        );
    }

    checkCurrentlyTypedWord() {
        const { invalidChars, maxLengthExceeded, alreadyExists } = this.props.currentlyTyped.warnings;
        const messages = this.props.lang;

        if (invalidChars) {
            return (
                (invalidChars.length > 1
                    ? messages.SUBMITTED_WORD_HAS_INVALID_CHARS
                    : messages.SUBMITTED_WORD_HAS_INVALID_CHAR
                )
                + invalidChars.join(', ')
            );
        }

        if (maxLengthExceeded) return messages.SUBMITTED_WORD_TOO_LONG;

        if (alreadyExists) return messages.SUBMITTED_WORD_ALREADY_EXISTS;
    }

    render() {

        const error = this.checkCurrentlyTypedWord();
        console.log(error);

        return (
            <div className="word-list">
                <Form layout="inline">
                    <Form.Item
                        label=""
                        validateStatus={error ? 'error' : ''}
                        help={error}
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
                {this.getList()}
            </div>
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
        list: state.words.list,
        lang: state.settings.language.messages
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(WordList);
