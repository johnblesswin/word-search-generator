import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import './WaitOverlay.css';

class WaitOverlay extends React.Component {

    render() {
        return (
            <div 
                className={'wait-overlay ' + (this.props.isActive ? 'wait-overlay--is-active' : '')}
            >
                <Spin
                    tip={this.props.lang.PUZZLE_IS_BEING_GENERATED}
                    size="large"
                />
            </div>
        );
    }
}

WaitOverlay.propTypes = {
    isActive: PropTypes.bool.isRequired
};

export default WaitOverlay;
