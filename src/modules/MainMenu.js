import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import { Icon, Header, Grid, Menu } from 'semantic-ui-react';

class MainMenu extends React.Component {

  render() {
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

}

export default MainMenu;
