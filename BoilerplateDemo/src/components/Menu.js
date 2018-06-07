import React, { Component } from 'react';
import { Dropdown, Menu, Label } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/menu';
import Auth from '../config/session';

class MenuApp extends Component {

  handleClickItem = (e, { name, to }) => {
    const { changeActiveItem, history } = this.props;
    changeActiveItem(name);
    history.push(to);
  };

  handleClickSingout = (e) => {
    Auth.logout();
    const { changeActiveItem, history } = this.props;
   
    history.push('/login');
  };

  render() {
    const { active } = this.props;

    return (
      <Menu borderless>
        <Menu.Item name="home" to="/" active={active === "home"} onClick={this.handleClickItem} />
        <Menu.Menu>
          <Dropdown item text="Administration">
            <Dropdown.Menu>
              <Dropdown.Item name="administration" to="/people" onClick={this.handleClickItem}>People</Dropdown.Item>
              <Dropdown.Item name="administration" to="/providers" onClick={this.handleClickItem}>Providers</Dropdown.Item>
              <Dropdown.Item name="administration" to="/products" onClick={this.handleClickItem}>Products</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
        <Menu.Item name="blabla" to="/blabla" active={active === "blabla"} onClick={this.handleClickItem} />
        <Menu.Menu position="right">
          <Menu.Item>
            <Label as="a">
              UserName
            </Label>
          </Menu.Item>

          <Dropdown item icon='configure'>
            <Dropdown.Menu>
              <Dropdown.Item name="users" to="/users" onClick={this.handleClickItem}>Users</Dropdown.Item>
              <Dropdown.Item name="permissions" to="/permissions" onClick={this.handleClickItem}>Administration</Dropdown.Item>
              <Dropdown.Item name="roles" to="/roles" onClick={this.handleClickItem}>Roles</Dropdown.Item>
              <Dropdown.Item name="singout" to="/singout" onClick={this.handleClickSingout}>Singout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Menu>
    );
  }
}

const mapStateToProps = state => {
  return {
    active: state.menu.active,
    clients: state.clients
  };
};

export default connect(mapStateToProps, actions)(withRouter(MenuApp));
