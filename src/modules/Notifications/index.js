import React from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';

class Notifications extends React.Component {

    active = {
        invalidCharsFound: false,
        wordsMaxLengthExceeded: false,
        puzzleReady: false,
        puzzleError: false
    }

    styles = {
        invalidCharsFound: 'warning',
        wordsMaxLengthExceeded: 'warning',
        puzzleReady: 'success',
        puzzleError: 'error'
    }

    langStrings = {
        invalidCharsFound: 'INVALID_CHARS_FOUND',
        wordsMaxLengthExceeded: 'MAX_WORD_LENGTH_EXCEEDED',
        puzzleReady: 'PUZZLE_READY',
        puzzleError: 'PUZZLE_ERROR'
    }

    componentWillUpdate({notifications, lang}) {

        const activeNotifications = this.active,
              newNotifications = {};

        Object.entries(notifications).forEach(([name, enabled]) => {
            
            // Display new notifications
            if (!activeNotifications[name] && notifications[name]) {
                newNotifications[name] = this.launchNotification(name, lang);
            }
            // Clear notifications that have just become unrelevant
            if (activeNotifications[name] && !notifications[name]) {
                newNotifications[name] = false;
            }
        });

        this.active = {
            ...activeNotifications,
            ...newNotifications
        };
    }

    launchNotification(notification, lang) {
        const style = this.styles[notification],
              langString = this.langStrings[notification];

        return message[style](lang[langString], 2);
    }

    render() {
        return null;
    }
}

Notifications.propTypes = {
    notifications: PropTypes.shape({
        invalidCharsFound: PropTypes.bool.isRequired,
        wordsMaxLengthExceeded: PropTypes.bool.isRequired,
        puzzleReady: PropTypes.bool.isRequired,
        puzzleError: PropTypes.bool.isRequired
    }).isRequired,
    lang: PropTypes.objectOf(PropTypes.string).isRequired
};

export default Notifications;
