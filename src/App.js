import React from 'react';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as actions from './actions';
import { connect } from 'react-redux';

import Layout from './modules/Layout';
import LanguageSwitcher from './modules/LanguageSwitcher';
import Navigation from './modules/Navigation';
import Notifications from './modules/Notifications';
import SetupGrid from './modules/SetupGrid';
import WordList from './modules/WordList';
import Preview from './modules/Preview';
import Print from './modules/Print';

class App extends React.Component {

  getPageContent = () => {
    return (
        <Switch>
            <Route exact path='/' component={SetupGrid} />
            <Route path='/add-words' component={WordList} />
            <Route path='/preview' component={Preview} />
            <Route path='/print' component={Print} />
            <Route path="*" render={() => (<Redirect to="/" />)} />
        </Switch>
    );
  }

  render() {
    return (
        <React.Fragment>
            <Notifications
                notifications={this.props.notifications}
                lang={this.props.lang}
            />
            <LanguageSwitcher
                    {...this.props.languageOptions}
                    switchLanguage={this.props.actions.switchLanguage}
            />
            <Layout
                title={this.props.lang.HEADER_TITLE}
                menu={<Navigation lang={this.props.lang} />}
                navButtons={<Navigation navButtons lang={this.props.lang} />}
                pageContent={this.getPageContent()}
                pagePath={this.props.location.pathname}
            />
        </React.Fragment>
    );
  }

}

const mapStateToProps = (state, ownProps) => ({
    lang: state.settings.language.messages,
    languageOptions: {
        languages: Object.entries(state.settings.language.allLanguages).reduce((all, [code, {name}]) =>
            [
                ...all,
                {
                    code,
                    name
                }
            ]
        , []),
        currentLang: state.settings.language.current,
        locked: state.settings.locked
    },
    notifications: {
        invalidCharsFound: state.words.warnings.invalidChars,
        wordsMaxLengthExceeded: state.words.warnings.maxLengthExceeded,
        puzzleReady: Boolean(state.puzzle.generated),
        puzzleError: state.puzzle.error
    }
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));