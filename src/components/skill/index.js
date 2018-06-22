import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Input, Button, Form } from 'semantic-ui-react';
import Request from '../../api/request';
import NotificationSystem from 'react-notification-system';
import { API_URL_SKILLS } from '../../api/URLs';

class Skill extends Component {
    constructor() {
        super();
        this.state = {
            id: 0,
            name: '',
            nameError: false,
            formError: false,
            errorMessage: 'Please complete all required fields.',
        };
    }
    changeValue(field, value) {
        this.setState({ [field]: value });
    }


    clearState = () => this.setState({ id: 0, name: '' });

    handleCreate = async () => {
        if (this.formHasErrors('CREATE')) {
            return;
        }
        const { name } = this.state;
        const details = {
            name: name
        }

        Request.post({
            url: API_URL_SKILLS + '/new',
            data: details
        })
            .then(response => {
                if (response.status === 201) {
                    this.refs.notificationSystem.addNotification({
                        message: 'Success',
                        level: 'success'
                    });
                    this.clearState();
                }
            })
            .catch(error => {
                this.refs.notificationSystem.addNotification({
                    message: 'There was an unexpected situation, try again later',
                    level: 'warning'
                });
                console.log('Error', error);
            })
    }

    handleUpdate = async () => {
        if (this.formHasErrors('UPDATE')) {
            return;
        }
        const { id, name } = this.state;

        const details = {
            name: name
        }

        Request.put({
            url: API_URL_SKILLS + '/' + id + '/update',
            data: details
        })
            .then(response => {
                if (response.status === 204) {
                    this.refs.notificationSystem.addNotification({
                        message: 'Success',
                        level: 'success'
                    });
                    this.clearState();
                }
            })
            .catch(error => {
                this.refs.notificationSystem.addNotification({
                    message: 'There was an unexpected situation, try again later',
                    level: 'warning'
                });
                console.log('Error', error);
            })
    }

    handleDelete = async () => {
        if (this.formHasErrors('DELETE')) {
            return;
        }
        const { id } = this.state;

        Request.delete({
            url: API_URL_SKILLS + '/' + id + '/delete',
        })
            .then(response => {
                if (response.status === 200) {
                    this.refs.notificationSystem.addNotification({
                        message: 'Success',
                        level: 'success'
                    });
                    this.clearState();
                }
            })
            .catch(error => {
                this.refs.notificationSystem.addNotification({
                    message: 'There was an unexpected situation, try again later',
                    level: 'warning'
                });
                console.log('Error', error);
            })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            id: nextProps.skill.id,
            name: nextProps.skill.name
        });
        this.forceUpdate();
    }

    formHasErrors(originator) {
        let error = false;
        switch (originator) {
            case 'CREATE':
            case 'UPDATE':

                if (this.state.name === '') {
                    this.setState({ nameError: true })
                    error = true
                    return error;
                } else {
                    this.setState({ nameError: false })
                    error = false
                }
                break;
            case 'DELETE':
                if (this.state.ID === 0) {
                    this.setState({ idError: true })
                    error = true
                    return error;
                } else {
                    this.setState({ badgeidError: false })
                    error = false
                }
                break;
            default:
                break;
        }
        return error;
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
                                <label>Skill ID</label>
                                <Input
                                    disabled
                                    icon="user"
                                    placeholder="Id"
                                    required={true}
                                    onChange={e => this.changeValue('id', e.target.value)}
                                    value={this.state.id}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Skill Name</label>
                                <Input
                                    icon="user"
                                    placeholder="name"
                                    required={true}
                                    error={this.state.nameError}
                                    onChange={e => this.changeValue('name', e.target.value)}
                                    value={this.state.name}
                                />
                            </Form.Field>
                            <Form.Field>
                                {this.state.id === 0 && <Button fluid primary onClick={this.handleCreate}>Create</Button>}
                                {this.state.id !== 0 && <Button fluid secondary onClick={this.handleUpdate}>Update</Button>}
                                {this.state.id !== 0 && <Button fluid danger onClick={this.handleDelete}>Delete</Button>}
                                <Button fluid secondary onClick={this.clearState}>Clear</Button>
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
