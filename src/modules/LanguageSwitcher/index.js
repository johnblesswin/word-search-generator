import React from 'react';
import PropTypes from 'prop-types';
import { switchLanguage } from '../../actions/index';

class LanguageSwitcher extends React.Component {

    render() {
        console.log(this.props);
        return null;
    }
}

LanguageSwitcher.propTypes = {
    languages: PropTypes.objectOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            charset: PropTypes.arrayOf(PropTypes.string).isRequired,
            messages: PropTypes.objectOf(PropTypes.string).isRequired
        })
    ).isRequired,
    currentLang: PropTypes.string.isRequired,
    locked: PropTypes.bool.isRequired,
    switchLanguage: PropTypes.func.isRequired
};

export default LanguageSwitcher;