import React from 'react';
import {Route, IndexRoute} from 'react-router-dom';
import App from './App';
import StartPage from './modules/StartPage'
import SetupGrid from './modules/SetupGrid'

export default (
  <Route path='/' component={App}>
    <IndexRoute component={StartPage} />
    <Route path='setup-grid' component={SetupGrid} />
  </Route>
);
