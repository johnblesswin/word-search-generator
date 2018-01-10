import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import { Icon, Header, Grid, Menu } from 'semantic-ui-react';
import { Route, Switch, Redirect, NavLink } from 'react-router-dom';

// app modules:
import StartPage from './modules/StartPage';
import SetupGrid from './modules/SetupGrid';
import WordList from './modules/WordList';
import Preview from './modules/Preview';
import Print from './modules/Print';
import Download from './modules/Download';

class App extends React.Component {

  mainMenu() {
    return (
      <Menu fluid vertical tabular size='massive'>
        <Menu.Item as={NavLink} to='/setup-grid'>
          <Icon name='grid layout' color='brown' />Setup grid
        </Menu.Item>
        <Menu.Item as={NavLink} to='/add-words'>
          <Icon name='write' color='brown' />Add words
        </Menu.Item>
        <Menu.Item as={NavLink} to='/preview'>
          <Icon name='eye' color='brown' />Preview
        </Menu.Item>
        <Menu.Item as={NavLink} to='/print'>
          <Icon name='print' color='brown' />Print
        </Menu.Item>
        <Menu.Item as={NavLink} to='/download'>
          <Icon name='file pdf outline' color='brown' />Download
        </Menu.Item>
      </Menu>
    );
  }

  pageContent() {
    return (
      <Switch>
        <Route exact path='/' component={StartPage} />
        <Route path='/setup-grid' component={SetupGrid} />
        <Route path='/add-words' component={WordList} />
        <Route path='/preview' component={Preview} />
        <Route path='/print' component={Print} />
        <Route path='/download' component={Download} />
        <Route path="*" render={() => (<Redirect to="/" />)} />
      </Switch>
    );
  }

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
            {this.mainMenu()}
          </Grid.Column>
          <Grid.Column width='12'>
            {this.pageContent()}
          </Grid.Column>
        </Grid>
      </React.Fragment>
    );
  }
}

export default App;
