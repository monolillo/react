import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Input, Button, Form } from 'semantic-ui-react';
import Request from '../../api/request';
import NotificationSystem from 'react-notification-system';
import { API_URL_STATION } from '../../api/URLs';

class Station extends Component {
    constructor() {
        super();
        this.state = {
            id: 0,
            name: '',
            bvblufiid:0,
            idError:false,
            nameError: false,
            bvblufiidError: false,
            formError: false,
            errorMessage: 'Please complete all required fields.'
        };
    }
    changeValue(field, value) {
        this.setState({ [field]: value });
    }

    clearState = () => this.setState({ id: 0, name: '',bvblufiid:0 });

    handleCreate = async () => {
        if (this.formHasErrors('CREATE')) {
            return;
        }
        const { name,bvblufiid } = this.state;
        const details = {
            name: name,
            bvblufiid:bvblufiid
        }

        Request.post({
            url: API_URL_STATION + '/new',
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
        const { id, name ,bvblufiid} = this.state;

        const details = {
            name: name,
            bvblufiid:bvblufiid
        }

        Request.put({
            url: API_URL_STATION + '/' + id + '/update',
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
            url: API_URL_STATION + '/' + id + '/delete',
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
            id: nextProps.station.id,
            name: nextProps.station.name,
            bvblufiid:nextProps.station.bvblufiid
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
                if (this.state.bvblufiid === '') {
                    this.setState({ bvblufiidError: true })
                    error = true
                    return error;
                } else {
                    this.setState({ bvblufiidError: false })
                    error = false
                }
                break;
            case 'DELETE':
                if (this.state.ID === 0) {
                    this.setState({ idError: true })
                    error = true
                    return error;
                } else {
                    this.setState({ idError: false })
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
                                <label>Station ID</label>
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
                                <label>Station Name</label>
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
                                <label>Station bvblufiid</label>
                                <Input
                                    icon="user"
                                    placeholder="bvblufiid"
                                    required={true}
                                    error={this.state.bvblufiidError}
                                    onChange={e => this.changeValue('bvblufiid', e.target.value)}
                                    value={this.state.bvblufiid}
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
        station: globalState.station
    }
}

export default connect(mapStateToProps)(Station);
