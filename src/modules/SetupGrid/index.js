import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';
import { Spin, Slider } from 'antd';
import GridPreview from '../GridPreview';

class SetupGrid extends React.Component {

    state = {
        tempGridSize: this.props.gridSize.current
    }

    onChange = (value) => {
        this.setState({
            ...this.state,
            tempGridSize: value
        });
    }

    onAfterChange = (value) => {
        this.props.actions.setGridSize(value);
    }

    render() {
        const {min, max, current} = this.props.gridSize;
        return (
            <React.Fragment>
                <Slider
                    min={min}
                    max={max}
                    defaultValue={current}
                    onChange={this.onChange}
                    onAfterChange={this.onAfterChange}
                    tipFormatter={(size) => `${size} × ${size}`}
                    step={5}
                />
                <GridPreview gridSize={this.state.tempGridSize} />
            </React.Fragment>
        );
    }
}

SetupGrid.propTypes = {
    actions: PropTypes.objectOf(PropTypes.func).isRequired,
    lang: PropTypes.objectOf(PropTypes.string).isRequired,
    gridSize: PropTypes.shape({
        min: PropTypes.number,
        max: PropTypes.number,
        current: PropTypes.number
    }).isRequired
};

const mapStateToProps = (state, ownProps) => ({
    lang: state.settings.language.messages,
    gridSize: state.settings.gridSize
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SetupGrid);