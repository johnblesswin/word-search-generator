import React from 'react';
import { render } from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App';

render(<Router><App /></Router>,
  document.getElementById('root')
);
