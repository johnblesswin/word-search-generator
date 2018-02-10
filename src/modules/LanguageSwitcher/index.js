import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Icon } from 'antd';

class LanguageSwitcher extends React.Component {

    switchLanguage(langCode) {
        if (langCode !== this.props.currentLang) {
            this.props.switchLanguage(langCode);
        }
    }

    getMenu() {
        return (
            <Menu onClick={({key}) => this.switchLanguage(key)}>
                {this.props.languages.map(language => 
                    <Menu.Item
                        key={language.code}
                    >
                        {language.name}
                    </Menu.Item>
                )}
          </Menu>
        );
    }

    render() {
        const menu = this.getMenu();
        return (
            <Dropdown
                overlay={menu}
                disabled={this.props.locked}
            >
                <a>{this.props.currentLang} <Icon type="down" /></a>
            </Dropdown>
        );
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