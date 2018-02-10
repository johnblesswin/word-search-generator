import React from 'react';
import PropTypes from 'prop-types';
import { switchLanguage } from '../../actions/index';

class LanguageSwitcher extends React.Component {

    render() {
        return null;
    }
}

LanguageSwitcher.propTypes = {
    languages: PropTypes.arrayOf(
        PropTypes.shape({
            code: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
        })
    ).isRequired,
    currentLang: PropTypes.string.isRequired,
    locked: PropTypes.bool.isRequired,
    switchLanguage: PropTypes.func.isRequired
};

export default LanguageSwitcher;