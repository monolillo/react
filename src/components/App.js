import React, { Component, Fragment } from 'react';
import Menu from './Menu';
import MenuMobile from './MenuMobile';
import Auth from '../config/session';
import Login from './login';
import { Container, Responsive } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class App extends Component {

  renderLogin() {
    return (
      <Fragment>
        <Login />
      </Fragment>
    );
  }

  renderContent() {
    return (
      <Fragment>
        <Responsive {...Responsive.onlyMobile}>
          <MenuMobile>
            <Container>
              {this.props.children}
            </Container>
          </MenuMobile>
        </Responsive>
        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          <Menu />
          <Container>
            {this.props.children}
          </Container>
        </Responsive>
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
