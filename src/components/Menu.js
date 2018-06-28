import React, { Component } from 'react';
import { Image, Dropdown, Menu, Label } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/menu';
import Auth from '../config/session';
import SearchComponent from './search';
import BrandLogo from '../assets/eluxlogo.png';


class MenuApp extends Component {

  state = {
    visible: false
  };

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
    const { active } = this.props;

    return (
      <div>
        <div>
          <Menu borderless inverted color="blue" style={{backgroundColor: "#021d42"}}>
            <Menu.Item>
              <Image size="mini" src={BrandLogo} />
            </Menu.Item>
            <Menu.Item name="home" to="/" active={active === "home"} onClick={this.handleClickItem} />
            <Menu.Menu>
              <Dropdown item text="Administration">
                <Dropdown.Menu>
                  <Dropdown.Item name="people" to="/people" onClick={this.handleClickItem}>People</Dropdown.Item>
                  <Dropdown.Item name="skill" to="/skill" onClick={this.handleClickItem}>Skills</Dropdown.Item>
                  <Dropdown.Item name="station" to="/station" onClick={this.handleClickItem}>Stations</Dropdown.Item>
                  <Dropdown.Item name="stationskill" to="/stationskill" onClick={this.handleClickItem}>Stations - Skills</Dropdown.Item>
                  <Dropdown.Item name="peopleskill" to="/peopleskill" onClick={this.handleClickItem}>People - Skills</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Menu>
            <Menu.Item name="livemap" to="/livemap" active={active === "livemap"} onClick={this.handleClickItem} />
            <Menu.Item name="playground" to="/playground" active={active === "playground"} onClick={this.handleClickItem} />
            <Menu.Menu position="right">
              <Menu.Item>
                <Label as="a">
                  UserName
                  </Label>
              </Menu.Item>
              <Menu.Item>
                <SearchComponent actualcomponent={active} />
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
