import _ from 'lodash';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Input, Button, Form, Search, Grid, Header, Label } from 'semantic-ui-react';
import Request from '../../api/request';
import NotificationSystem from 'react-notification-system';
import { API_URL_SKILLS } from '../../api/URLs';


class Skill extends Component {
    constructor() {
        super();

        this.state = {
            id: 0,
            name: ''
        };
    }
    changeValue(field, value) {
        this.setState({ [field]: value });
    }

    clearState = () => this.setState({ id: 0, name: '' });

    handleCreate = async () => {
        const { history } = this.props;
        const { name } = this.state;

        const details = {
            name: name
        }

        const formBody = await this.setFormBody(details);

        Request.post({
            url: API_URL_SKILLS + '/new',
            data: details
        })
            .then(response => {
                if (response.status === 201) {
                    this.refs.notificationSystem.addNotification({
                        message: 'funciono',
                        level: 'success'
                    });
                    this.clearState();
                }
            })
            .catch(error => {
                this.refs.notificationSystem.addNotification({
                    message: 'Invalid user, check your data and try again',
                    level: 'warning'
                });
                console.log('Error', error);
            })
    }

    handleUpdate = async () => {
        const { history } = this.props;
        const { id, name } = this.state;

        const details = {
            name: name
        }

        const formBody = await this.setFormBody(details);

        Request.put({
            url: API_URL_SKILLS + '/' + id + '/update',
            data: details
        })
            .then(response => {
                if (response.status === 204) {
                    this.refs.notificationSystem.addNotification({
                        message: 'funciono',
                        level: 'success'
                    });
                    this.clearState();
                }
            })
            .catch(error => {
                this.refs.notificationSystem.addNotification({
                    message: 'Invalid user, check your data and try again',
                    level: 'warning'
                });
                console.log('Error', error);
            })
    }

    handleDelete = async () => {
        const { history } = this.props;
        const { id } = this.state;

        Request.delete({
            url: API_URL_SKILLS + '/' + id + '/delete',
        })
            .then(response => {
                if (response.status === 200) {
                    this.refs.notificationSystem.addNotification({
                        message: 'funciono',
                        level: 'success'
                    });
                    this.clearState();
                }
            })
            .catch(error => {
                this.refs.notificationSystem.addNotification({
                    message: 'Invalid user, check your data and try again',
                    level: 'warning'
                });
                console.log('Error', error);
            })
    }

    setFormBody(details) {
        var formBody = [];
        for (let property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        };
        return formBody.join("&");
    }

    componentWillReceiveProps(nextProps) {
        console.log('skill',nextProps);
         this.setState({
             id: nextProps.skill.id,
             name: nextProps.skill.name
         });
         this.forceUpdate();
    }

    render() {
        return (
            <Fragment>
                <div className="ui two column right grid">
                </div>
                <div className="ui one column centered grid">
                    <div className="column" >
                        <Form>
                            <Form.Field>
                                <Input label='Skill id'
                                    icon="user"
                                    placeholder="Id"
                                    onChange={e => this.changeValue('id', e.target.value)}
                                    value={this.state.id}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Input
                                    label='Skill Name'
                                    icon="user"
                                    placeholder="name"
                                    onChange={e => this.changeValue('name', e.target.value)}
                                    value={this.state.name}
                                />
                            </Form.Field>
                            <Form.Field>
                                {this.state.id === 0 && <Button fluid primary onClick={this.handleCreate}>Create</Button>}
                                {this.state.id != 0 && <Button fluid secondary onClick={this.handleUpdate}>Update</Button>}
                                {this.state.id != 0 && <Button fluid danger onClick={this.handleDelete}>Delete</Button>}
                            </Form.Field>
                        </Form>
                    </div>
                </div>
                <NotificationSystem ref="notificationSystem" />
            </Fragment>
        );
    }
}

const mapStateToProps = (globalState) => {
    return {
        skill: globalState.skill
    }
}

export default connect(mapStateToProps)(Skill);
