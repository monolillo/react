import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Input, Button, Form, Grid, Segment, Header, Confirm } from 'semantic-ui-react';
import Request from '../../api/request';
import NotificationSystem from 'react-notification-system';
import { API_URL_STATION } from '../../api/URLs';
import SearchComponent from '../search';

class Station extends Component {
    constructor() {
        super();
        this.state = {
            id: 0,
            name: '',
            bvblufiid: 0,
            idError: false,
            nameError: false,
            bvblufiidError: false,
            formError: false,
            errorMessage: 'Please complete all required fields.',
            nextProps: []
        };
    }
    changeValue(field, value) {
        this.setState({ [field]: value });
    }

    clearState = () => this.setState({ id: 0, name: '', bvblufiid: 0 });

    handleCreate = async () => {
        if (this.formHasErrors('CREATE')) {
            return;
        }
        const { name, bvblufiid } = this.state;
        const details = {
            name: name,
            bvblufiid: bvblufiid
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
                        , position: 'br'
                    });
                    this.clearState();
                }
            })
            .catch(error => {
                this.refs.notificationSystem.addNotification({
                    message: 'There was an unexpected situation, try again later',
                    level: 'warning'
                    , position: 'br'
                });
                console.log('Error', error);
            })
    }

    handleUpdate = async () => {
        if (this.formHasErrors('UPDATE')) {
            return;
        }
        const { id, name, bvblufiid } = this.state;

        const details = {
            name: name,
            bvblufiid: bvblufiid
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
                        , position: 'br'
                    });
                    this.clearState();
                }
            })
            .catch(error => {
                this.refs.notificationSystem.addNotification({
                    message: 'There was an unexpected situation, try again later',
                    level: 'warning'
                    , position: 'br'
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
                        , position: 'br'
                    });
                    this.clearState();
                }
            })
            .catch(error => {
                this.refs.notificationSystem.addNotification({
                    message: 'There was an unexpected situation, try again later',
                    level: 'warning'
                    , position: 'br'
                });
                console.log('Error', error);
            })
    }

    componentWillReceiveProps(nextProps) {
        const { id } = this.state
        if (id === 0 || id === undefined) {
            this.setState({
                id: nextProps.station.id,
                name: nextProps.station.name,
                bvblufiid: nextProps.station.bvblufiid,
                confirmOpen: false
            });
        } else {
            this.setState({ confirmOpen: true, nextProps: nextProps });
        }
    }

    componentWillMount() {
        this.clearState();
    }

    componentWillUnmount() {
        this.clearState();
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

    handleCancel = () => this.setState({ confirmOpen: false })
    handleConfirm = async () => {
        this.setState({
            id: this.state.nextProps.station.id,
            name: this.state.nextProps.station.name,
            bvblufiid: this.state.nextProps.station.bvblufiid,
            confirmOpen: false
        });
    }

    render() {
        return (
            <div >
                <Grid>
                    <Grid.Row>
                        <Grid.Column textAlign='right'>
                            <SearchComponent />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Fragment>
                    <Segment raised>
                        <Header as='h2'>
                            <Header.Content>
                                Stations
                            </Header.Content>
                        </Header>
                        <Form>
                            <Form.Group>
                                <Form.Field width={3}>
                                    <label>Station ID</label>
                                    <Input
                                        readOnly
                                        icon="industry"
                                        placeholder="Id"
                                        required={true}
                                        onChange={e => this.changeValue('id', e.target.value)}
                                        value={this.state.id}
                                    />
                                </Form.Field>
                                <Form.Field width={13}>
                                    <label>Station Name</label>
                                    <Input
                                        icon="industry"
                                        placeholder="Station Name"
                                        required={true}
                                        error={this.state.nameError}
                                        onChange={e => this.changeValue('name', e.target.value)}
                                        value={this.state.name}
                                    />
                                </Form.Field>
                            </Form.Group>
                            <Form.Field>
                                <label>Station BluFi ID</label>
                                <Input
                                    icon="sync"
                                    placeholder="Station BluFi ID"
                                    required={true}
                                    error={this.state.bvblufiidError}
                                    onChange={e => this.changeValue('bvblufiid', e.target.value)}
                                    value={this.state.bvblufiid}
                                />
                            </Form.Field>
                            <Form.Field>
                                {this.state.id === 0 || this.state.id === undefined ? //New Station
                                    <Grid>
                                        <Grid.Row columns={2}>
                                            <Grid.Column></Grid.Column>
                                            <Grid.Column textAlign='right'>
                                                <Form.Group>
                                                    <Form.Field width={8}>
                                                        <Button fluid primary onClick={this.handleCreate}>Create</Button>
                                                    </Form.Field>
                                                    <Form.Field width={8}>
                                                        <Button fluid color='grey' onClick={this.clearState}>Clear</Button>
                                                    </Form.Field>
                                                </Form.Group>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                    : //Existent Station
                                    <Grid>
                                        <Grid.Row columns={2}>
                                            <Grid.Column></Grid.Column>
                                            <Grid.Column textAlign='right'>
                                                <Form.Group>
                                                    <Form.Field width={6}>
                                                        <Button fluid primary onClick={this.handleUpdate}>Update</Button>
                                                    </Form.Field>
                                                    <Form.Field width={6}>
                                                        <Button fluid color='red' onClick={this.handleDelete}>Delete</Button>
                                                    </Form.Field>
                                                    <Form.Field width={6}>
                                                        <Button fluid color='grey' onClick={this.clearState}>Clear</Button>
                                                    </Form.Field>
                                                </Form.Group>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                }
                            </Form.Field>
                        </Form>
                    </Segment>
                </Fragment>
                <Confirm open={this.state.confirmOpen} onCancel={this.handleCancel} onConfirm={this.handleConfirm} content="All unsaved data will be lost, do you want to proceed?" />
                <NotificationSystem ref="notificationSystem" />
            </div>
        );
    }
}

const mapStateToProps = (globalState) => {
    return {
        station: globalState.station
    }
}

export default connect(mapStateToProps)(Station);
