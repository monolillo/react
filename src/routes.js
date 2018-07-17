import React, { Component } from 'react';
import App from './components/App';
import Home from './components/home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class RoutesApp extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <App>
            <Route path="/" exact component={Home} />
          </App>
        </Switch>
      </Router>
    );
  }
}

export default RoutesApp;
