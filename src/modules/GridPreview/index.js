import React from 'react';
import PropTypes from 'prop-types';
import './GridPreview.css';

class GridPreview extends React.PureComponent {

    state = {
        actualContainerSize: 0
    }

    componentDidMount() {
        this.calculateDimensions();
        window.addEventListener("resize", this.calculateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.calculateDimensions);
    }

    getActualContainerWidth = () => {
        if (!this.container) return;
        return this.container.getBoundingClientRect().width;
    }

    calculateDimensions = () => {
        const {cols} = this.props,
        actualWidth = this.getActualContainerWidth();
        this.setState(state => ({
            actualContainerSize: this.getActualContainerWidth()
        }));
    }

    getRows() {
        const {gridSize} = this.props;

        return Array(gridSize).fill(null).map((item, rowIndex) => {
            const cells = Array(gridSize).fill(null).map((item, cellIndex) => {
                return <td key={`${rowIndex}_${cellIndex}`} />;
            });
            return <tr key={rowIndex}>{cells}</tr>;
        });
    }

    render() {
        const size = this.state.actualContainerSize;

        return (
            <table 
                className="grid-preview__grid"
                ref={table => this.container = table}
                style={{
                    height: `${size}px`
                }}
            >
                <tbody>
                    {this.getRows()}
                </tbody>
            </table>
        );
    }
}

GridPreview.propTypes = {
    gridSize: PropTypes.number.isRequired
};

export default GridPreview;