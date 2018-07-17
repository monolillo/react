import React, { Component, Fragment } from 'react';
import Menu from './Menu';
import MenuMobile from './MenuMobile';
import { Container, Responsive } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import '../App.css';
 

class App extends Component {

  render() {
    return (
      <section className="app">
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
      </section>
    );
  }
}

export default App;
