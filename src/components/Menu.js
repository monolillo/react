import React, { Component } from 'react';
import { Image, Dropdown, Menu, Label } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/menu';
import PelotaFull from '../assets/pelotaFull.jpg';

class MenuApp extends Component {

  render() {
    const { active } = this.props;

    return (
      <div>
        <div>
          <Menu borderless inverted color="green" style={{backgroundColor: "#2EFE2E"}}>
            <Menu.Item>
              <Image size="tiny" src={PelotaFull} />
            </Menu.Item>
          </Menu>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    active: state.menu.active
  };
};

export default connect(mapStateToProps, actions)(withRouter(MenuApp));
