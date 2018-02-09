import React from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';

class Notifications extends React.Component {

    state = {
        invalidCharsFound: false,
        wordsMaxLengthExceeded: false,
        puzzleReady: false,
        puzzleError: false
    }

    types = {
        invalidCharsFound: 'warning',
        wordsMaxLengthExceeded: 'warning',
        puzzleReady: 'success',
        puzzleError: 'error'
    }

    componentWillReceiveProps({notifications}) {

        const activeNotifications = this.state,
              newNotifications = {};

        Object.entries(notifications).forEach(([name, enabled]) => {
            
            // Display new notifications
            if (!activeNotifications[name] && notifications[name]) {
                newNotifications[name] = this.launchNotification(name);
            }
            // Close notifications that have just become unrelevant
            if (activeNotifications[name] && !notifications[name]) {
                newNotifications[name] = false;
            }
        });

        this.setState(prevState => ({
            ...prevState,
            ...newNotifications
        }));

    }

    launchNotification(notification) {
        const type = this.types[notification];
        return message[type](notification, 1);
    }

    render() {
        return null;
    }
}

export default Notifications;
