import React, { Component } from 'react';
import { Dropdown, Menu, Label } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/menu';
import Auth from '../config/session';
import SearchComponent from './search'

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
              <Dropdown.Item name="people" to="/people" onClick={this.handleClickItem}>People</Dropdown.Item>
              <Dropdown.Item name="skill" to="/skill" onClick={this.handleClickItem}>Skills</Dropdown.Item>
              <Dropdown.Item name="station" to="/station" onClick={this.handleClickItem}>Stations</Dropdown.Item>
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
          <Menu.Item>
            <SearchComponent actualcomponent={active}/>
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
    active: state.menu.active
  };
};

export default connect(mapStateToProps, actions)(withRouter(MenuApp));
