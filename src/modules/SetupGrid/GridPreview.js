import React from 'react';
import PropTypes from 'prop-types';

class GridPreview extends React.PureComponent {

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
        return (
            <table className="grid-preview__grid">
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