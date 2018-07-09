import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Input, Button, Form, Grid, Segment, Header, Confirm } from 'semantic-ui-react';
import Request from '../../api/request';
import NotificationSystem from 'react-notification-system';
import { API_URL_SKILLS } from '../../api/URLs';
import SearchComponent from '../search';

class Skill extends Component {
    constructor() {
        super();
        this.state = {
            id: 0,
            name: '',
            nameError: false,
            formError: false,
            errorMessage: 'Please complete all required fields.',
            nextProps: []
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
            url: API_URL_SKILLS + '/' + id + '/delete',
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
                id: nextProps.skill.id,
                name: nextProps.skill.name,
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

    handleCancel = () => this.setState({ confirmOpen: false })
    handleConfirm = async () => {
        this.setState({
            id: this.state.nextProps.skill.id,
            name: this.state.nextProps.skill.name,
            confirmOpen: false
        });
    }

    render() {
        return (
            <div>
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
                                Skills
                        </Header.Content>
                        </Header>
                        <Form>
                            <Form.Group>
                                <Form.Field width={3}>
                                    <label>Skill ID</label>
                                    <Input
                                        readOnly
                                        icon="cog"
                                        placeholder="Id"
                                        required={true}
                                        onChange={e => this.changeValue('id', e.target.value)}
                                        value={this.state.id}
                                    />
                                </Form.Field>
                                <Form.Field width={13}>
                                    <label>Skill Name</label>
                                    <Input
                                        icon="cog"
                                        placeholder="name"
                                        required={true}
                                        error={this.state.nameError}
                                        onChange={e => this.changeValue('name', e.target.value)}
                                        value={this.state.name}
                                    />
                                </Form.Field>
                            </Form.Group>
                            {this.state.id === 0 || this.state.id === undefined ? //New People
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
                                : //Existent people
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
    console.log(this.props);
    return {
        skill: globalState.skill
    }
}

export default connect(mapStateToProps)(Skill);
