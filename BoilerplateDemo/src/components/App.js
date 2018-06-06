import React, { Component, Fragment } from 'react';
import Menu from './Menu';
import Auth from '../config/session';
import Login from './login';
import { Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class App extends Component {

  renderLogin() {
    return (
      <Fragment>
        <Login />
      </Fragment>
    );
  }

  renderContent() {
    return (
      <Fragment>
        <Menu />
        <Container>
          {this.props.children}
        </Container>
      </Fragment>
    );
  }

  render() {
    const renderView = Auth.isLogged() ? this.renderContent() : this.renderLogin();

    return (
      <section className="app">
        {renderView}
      </section>
    );
  }
}

export default App;
