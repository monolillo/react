import React, { Component } from 'react';
import App from './components/App';
import People from './components/people';
import Skill from './components/skill';
import Home from './components/home';
import Blabla from './components/blabla';
import Login from './components/login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class RoutesApp extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <App>
            <Route path="/" exact component={Home} />
            <Route path="/people" component={People} />
            <Route path="/skill" component={Skill} />            
            <Route path="/blabla" component={Blabla} />
            <Route path="/login" component={Login} />
          </App>
        </Switch>
      </Router>
    );
  }
}

export default RoutesApp;
