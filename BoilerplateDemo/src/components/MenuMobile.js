import _ from "lodash";
import React, { Component } from 'react';
import { Menu, Divider, Icon, Image, Sidebar, Responsive, Dropdown, Label, Segment, Header } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/menu';
import Auth from '../config/session';
import SearchComponent from './search';
import BrandLogo from '../assets/eluxlogo.png';


class MenuAppMobile extends Component {

    state = { visible: false }

    toggleVisibility = () => this.setState({ visible: !this.state.visible })

    handleClickItem = (e, { name, to }) => {
        const { changeActiveItem, history } = this.props;
        this.setState({ visible: !this.state.visible })
        changeActiveItem(name);
        console.log(to);
        history.push(to);
    };

    handleClickSingout = (e) => {
        Auth.logout();
        const { changeActiveItem, history } = this.props;
        history.push('/login');
    };

    handlePusher = () => {
        const { visible } = this.state;
        if (visible) this.setState({ visible: false });
    };

    handleToggle = () => this.setState({ visible: !this.state.visible });

    render() {
        const { active } = this.props;
        const { visible } = this.state
        return (

            <div>
                <Sidebar.Pushable>
                    <Sidebar
                        as={Menu}
                        animation="overlay"
                        icon="labeled"
                        inverted
                        style={{backgroundColor: "#021d42"}}
                        //items={leftItems}
                        vertical
                        visible={visible}
                    >
                        <Menu.Item name="home" to="/" active={active === "home"} onClick={this.handleClickItem} />
                        <Menu.Item name="people" to="/people" active={active === "people"} onClick={this.handleClickItem} />
                        <Menu.Item name="skill" to="/skill" active={active === "skill"} onClick={this.handleClickItem} />
                        <Menu.Item name="station" to="/station" active={active === "station"} onClick={this.handleClickItem} />
                        <Menu.Item name="stationskill" to="/stationskill" active={active === "stationskill"} onClick={this.handleClickItem} />
                        <Menu.Item name="livemap" to="/livemap" active={active === "livemap"} onClick={this.handleClickItem} />
                        <Divider/>
                        <Menu.Item name="users" to="/users" active={active === "users"} onClick={this.handleClickItem} />
                        <Menu.Item name="permissions" to="/permissions" active={active === "permissions"} onClick={this.handleClickItem} />
                        <Menu.Item name="roles" to="/roles" active={active === "roles"} onClick={this.handleClickItem} />
                        <Menu.Item name="singout" to="/singout" active={active === "singout"} onClick={this.handleClickItem} />
                    </Sidebar>
                    <Sidebar.Pusher
                        dimmed={visible}
                        onClick={this.handlePusher}
                        style={{ minHeight: "100vh" }}
                    >
                        <Menu fixed="top" inverted
                            style={{backgroundColor: "#021d42"}}>
                            <Menu.Item>
                                <Image size="mini" src={BrandLogo} />
                            </Menu.Item>
                            <Menu.Item onClick={this.handleToggle}>
                                <Icon name="sidebar" />
                            </Menu.Item>
                            <Menu.Menu position="right" style={{ marginTop: "10px", marginRight: "5px" }}>
                                <SearchComponent actualcomponent={active} />
                            </Menu.Menu>
                        </Menu>
                        {this.props.children}
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        active: state.menu.active
    };
};

export default connect(mapStateToProps, actions)(withRouter(MenuAppMobile));
