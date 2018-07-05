import React, { Component, Fragment } from 'react';
import Menu from './Menu';
import MenuMobile from './MenuMobile';
import Auth from '../config/session';
import Login from './login';
import { Container, Responsive } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import '../App.css';
 

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
    <div className="appContainer">
        <Responsive {...Responsive.onlyMobile} className="appContainer">
          <MenuMobile>
            <Container style={{marginTop : 70}}>
              {this.props.children}
            </Container>
          </MenuMobile>
        </Responsive>
        <Responsive minWidth={Responsive.onlyTablet.minWidth} className="appContainer">
          <Menu />
          <Container style={{marginTop : 10}}>
            {this.props.children}
          </Container>
        </Responsive>
    </div>
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
