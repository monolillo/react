import React, { Component, Fragment } from 'react';
import { Input, Button, Form, Grid, Segment, Header, Confirm, Dropdown, Dimmer, Loader } from 'semantic-ui-react';
import SearchComponent from '../search';
import { connect } from 'react-redux'
import Request from '../../api/request';
import { API_URL_GROUPS, API_URL_NEW, API_URL_UPDATE, API_URL_DELETE, API_URL_AUTHORITIES } from '../../api/URLs';
import NotificationSystem from 'react-notification-system';

class Groups extends Component {

    constructor() {
        super();
    
        this.state = {
            id: 0,
            name: '',
            nextProps: [],
            active: true,
            users: [],
            authorities: [],
            loadingAuthorities: true,
            selectedAuthorities: []
        };
    }

    changeValue(field, value) {
        this.setState({ [field]: value });
    }

    componentWillReceiveProps(nextProps) {
        const { id } = this.state
        if (id === 0 || id === undefined) {
            this.setState({
                id: nextProps.groups.id,
                name: nextProps.groups.name
            });
            this.setState({ confirmOpen: false });
        } else {
            this.setState({ confirmOpen: true, nextProps: nextProps });
        }
    }

    clearState = () => this.setState({ id: 0, name: '', nextProps: [] });

    componentWillMount() {
        this.clearState();
        this.loadAuthorities();
    }
    
    componentWillUnmount() {
        this.clearState();
    }

    loadAuthorities() {
        Request.get({
            url: API_URL_AUTHORITIES
        }).then(response => {
            if(response.status === 200){
                this.setState({ loadingAuthorities: false, active: false });
                const options = response.res.map(({ id, name }) => ({ value: id, text: name }))
                this.setState({ authorities: options });
            }
        })
    }

    handleCreate = async () => {

        const { name } = this.state;

        const details = {
            name: name
        }

        Request.post({
            url: API_URL_GROUPS + API_URL_NEW,
            data: details
        }).then(response => {
            if(response.status === 201){
                this.refs.notificationSystem.addNotification({
                    message: 'Success',
                    level: 'success',
                    position: 'br'
                });
                this.clearState();
            }
        }).catch(error => {
            this.refs.notificationSystem.addNotification({
                message: 'There was an unexpected situation, try again later',
                level: 'warning',
                position: 'br'
            });
        })
    }

    handleUpdate = async () => {

        const { id, name } = this.state;

        const details = {
            name: name
        }

        Request.put({
            url: API_URL_GROUPS + '/' + id + API_URL_UPDATE,
            data: details
        }).then(response => {
            if(response.status === 204){
                this.refs.notificationSystem.addNotification({
                    message: 'Success',
                    level: 'success',
                    position: 'br'
                });
                this.clearState();
            }
        }).catch(error => {
            this.refs.notificationSystem.addNotification({
                message: 'There was an unexpected situation, try again later',
                level: 'warning',
                position: 'br'
            })
        })
    }

    handleDelete = async () => {

        const { id } = this.state;

        Request.delete({
            url: API_URL_GROUPS + '/' + id + API_URL_DELETE
        }).then(response => {
            if(response.status === 200){
                this.refs.notificationSystem.addNotification({
                    message: 'Success',
                    level: 'success',
                    position: 'br'
                });
                this.clearState();
            }
        }).catch(error => {
            this.refs.notificationSystem.addNotification({
                message: 'There was an unexpected situation, try again later',
                level: 'warning',
                position: 'br'
            });
        })
    }

    render() {

        const { authorities, loadingAuthorities, selectedAuthorities } = this.state;
        const renderLabel = label => ({
            color: 'blue',
            content: `${label.text}`,
            icon: 'check',
        })

        return (
            <div>
                <Dimmer active={this.state.active}>
                    <Loader />
                </Dimmer>
                <Fragment>
                    <Segment raised>
                        <Grid>
                            <Grid.Row columns={2}>
                                <Grid.Column textAlign='left'>
                                    <Header as='h2'>
                                        <Header.Content> Groups </Header.Content>
                                    </Header>
                                </Grid.Column>
                                <Grid.Column textAlign='right'>
                                    <SearchComponent />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        <Form>
                            <Form.Group>
                                <Form.Field width={3}>
                                <label>Group id</label>
                                <Input
                                    readOnly
                                    icon="id badge"
                                    placeholder="Id"
                                    required={true}
                                    onChange={e => this.changeValue('id', e.target.value)}
                                    value={this.state.id}
                                />
                                </Form.Field>
                                <Form.Field width={13}>
                                <label>Name</label>
                                <Input
                                    icon="user"
                                    placeholder="Name"
                                    required={true}
                                    onChange={e => this.changeValue('name', e.target.value)}
                                    value={this.state.name}
                                />
                                </Form.Field>
                            </Form.Group>
                            <Form.Field>
                                <label>User Selection</label>
                                <Dropdown
                                disabled={this.state.id === 0 ? true : false}
                                multiple
                                selection
                                fluid
                                options={authorities}
                                placeholder='Choose one or multiple authorities'
                                renderLabel={renderLabel}
                                search
                                loading={loadingAuthorities}
                                onChange={(e, { value }) => this.changeValue('selectedAuthorities', value)}
                                value={selectedAuthorities}
                                />
                            </Form.Field>
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
                <NotificationSystem ref="notificationSystem" />
            </div>
        );
    }
}

const mapStateToProps = (globalState) => {
    console.log('mapStateToProps: ', globalState);
    return {
        groups: globalState.groups
    }
}
  
export default connect(mapStateToProps)(Groups);