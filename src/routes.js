import React, { Component } from 'react';
import App from './components/App';
import Livemap from './components/livemap';
import Stationskill from './components/stationskills';
import Peopleskill from './components/peopleskills';
import People from './components/people';
import Skill from './components/skill';
import Station from './components/station';
import Home from './components/home';
import Blabla from './components/blabla';
import PlayGround from './components/playground';
import Login from './components/login';
import Groups from './components/groups'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class RoutesApp extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <App>
            <Route path="/" exact component={Home} />
            <Route path="/livemap" component={Livemap} />
            <Route path="/stationskill" component={Stationskill} />
            <Route path="/peopleskill" component={Peopleskill} />
            <Route path="/people" component={People} />
            <Route path="/skill" component={Skill} />
            <Route path="/station" component={Station} />
            <Route path="/blabla" component={Blabla} />
            <Route path="/playground" component={PlayGround} />
            <Route path="/login" component={Login} />
            <Route path="/groups" component={Groups} />
          </App>
        </Switch>
      </Router>
    );
  }
}

export default RoutesApp;
