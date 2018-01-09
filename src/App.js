import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import { Icon, Header, Grid } from 'semantic-ui-react';
import { Route, Switch, Redirect } from 'react-router-dom';

import MainMenu from './modules/MainMenu';
import StartPage from './modules/StartPage';
import SetupGrid from './modules/SetupGrid';
import AddWords from './modules/AddWords';
import Preview from './modules/Preview';
import Print from './modules/Print';
import Download from './modules/Download';

class App extends React.Component {

  render() {
    return (
      <React.Fragment>
        <Header as='h1' size='huge' block>
          <Icon name='table' color='brown' />
          <Header.Content>
            eWord Search Generator
            <Header.Subheader>
              Make your own wordsearch printables
            </Header.Subheader>
          </Header.Content>
        </Header>
        <Grid>
          <Grid.Column width='4'>
            <MainMenu />
          </Grid.Column>
          <Grid.Column width='12'>
            <Switch>
              <Route exact path='/' component={StartPage} />
              <Route path='/setup-grid' component={SetupGrid} />
              <Route path='/add-words' component={AddWords} />
              <Route path='/preview' component={Preview} />
              <Route path='/print' component={Print} />
              <Route path='/download' component={Download} />
              <Route path="*" render={() => (<Redirect to="/" />)} />
            </Switch>
          </Grid.Column>
        </Grid>
      </React.Fragment>
    );
  }
}

export default App;
