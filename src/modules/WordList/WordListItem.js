import React from 'react';
import PropTypes from 'prop-types';
import { Button, Tooltip } from 'antd';

class WordListItem extends React.Component {

    render() {
        return (
            <div className={'word-list-item ' + (this.props.isValid ? '' : 'word-list-item--invalid')}>
                <ErrorDetails
                    error={!this.props.isValid}
                    errorDetails={this.props.warnings}
                    lang={this.props.lang}
                    word={this.props.word}
                >
                    <span className="word-list-item__word">
                        {this.props.word}
                    </span>
                </ErrorDetails>
                <Button
                    type="danger"
                    shape="circle"
                    icon="close"
                    size="small"
                    className="word-list-item__delete-btn"
                    onClick={() => this.props.remove(this.props.word)}
                />
            </div>
        );
    }

}

const ErrorDetails = ({error, errorDetails, lang, word, children}) => {
    if (!error) return children;

    const details = Object.entries(errorDetails)
    .map( ([errorType, error]) => {
        if (!error) return;
        switch (errorType) {
            case 'maxLengthExceeded': {
                return lang.WORD_TOO_LONG;
            }
            case 'invalidChars': {
                return (error.length > 1
                    ? lang.WORD_HAS_INVALID_CHARS
                    : lang.WORD_HAS_INVALID_CHAR
                )
                + error.join(', ');
            }
        }
    })
    .map((error, i) => {if (error) return <li key={word + i}>{error}</li>;} );



    return (
        <Tooltip
            title={<ul className="word-list-item__error">{details}</ul>}
        >
            {children}
        </Tooltip>
    );
    
};

WordListItem.propTypes = {
    word: PropTypes.string.isRequired,
    remove: PropTypes.func.isRequired
};

export default WordListItem;
