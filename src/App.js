import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import { Icon, Header, Grid, Menu } from 'semantic-ui-react'
import { Route, Link } from 'react-router-dom';

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
            Word Search Generator
            <Header.Subheader>
              Make your own wordsearch printables
            </Header.Subheader>
          </Header.Content>
        </Header>

        <Grid>
          <Grid.Column width='4'>
            <Menu fluid vertical tabular size='massive'>
              <Menu.Item as={Link} to='/setup-grid'>
                <Icon name='grid layout' color='brown' />Setup grid
              </Menu.Item>
              <Menu.Item as={Link} to='/add-words'>
                <Icon name='write' color='brown' />Add words
              </Menu.Item>
              <Menu.Item as={Link} to='/preview'>
                <Icon name='eye' color='brown' />Preview
              </Menu.Item>
              <Menu.Item as={Link} to='/print'>
                <Icon name='print' color='brown' />Print
              </Menu.Item>
              <Menu.Item as={Link} to='/download'>
                <Icon name='file pdf outline' color='brown' />Download
              </Menu.Item>
            </Menu>
          </Grid.Column>

          <Grid.Column width="12">

            <Route exact path="/" component={StartPage} />
            <Route path="/setup-grid" component={SetupGrid} />
            <Route path="/add-words" component={AddWords} />
            <Route path="/preview" component={Preview} />
            <Route path="/print" component={Print} />
            <Route path="/download" component={Download} />

          </Grid.Column>
        </Grid>



      </React.Fragment>
    );
  }
}

export default App;
