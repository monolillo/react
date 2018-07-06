import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Input, Button, Form, Grid, Segment, Header, Confirm } from 'semantic-ui-react';
import Request from '../../api/request';
import NotificationSystem from 'react-notification-system';
import { API_URL_PEOPLE } from '../../api/URLs';
import SearchComponent from '../search';

class People extends Component {

  constructor() {
    super();

    this.state = {
      id: 0,
      badgeid: '',
      name: '',
      bvbeaconid: '',
      iconurl: '',
      typeid: '',
      idError: false,
      badgeidError: false,
      nameError: false,
      bvbeaconidError: false,
      formError: false,
      errorMessage: 'Please complete all required fields.',
      confirmOpen: false,
      nextProps: []
    };
  }
  changeValue(field, value) {
    this.setState({ [field]: value });
  }

  clearState = () => this.setState({ id: 0, badgeid: '', name: '', bvbeaconid: '', iconurl: '', typeid: '', nextProps: [] });

  handleCreate = async () => {
    if (this.formHasErrors('CREATE')) {
      return;
    }

    const { badgeid, name, bvbeaconid } = this.state;

    const details = {
      badgeid: badgeid,
      name: name,
      bvbeaconid: bvbeaconid
    }

    Request.post({
      url: API_URL_PEOPLE + '/new',
      data: details
    })
      .then(response => {
        if (response.status === 201) {
          this.refs.notificationSystem.addNotification({
            message: 'Success',
            level: 'success'
            ,position:'br'
          });
          this.clearState();
        }
      })
      .catch(error => {
        this.refs.notificationSystem.addNotification({
          message: 'There was an unexpected situation, try again later',
          level: 'warning'
          ,position:'br'
        });
        console.log('Error', error);
      })
  }

  handleUpdate = async () => {
    if (this.formHasErrors('UPDATE')) {
      return;
    }

    const { id, badgeid, name, bvbeaconid } = this.state;

    const details = {
      badgeid: badgeid,
      name: name,
      bvbeaconid: bvbeaconid
    }

    Request.put({
      url: API_URL_PEOPLE + '/' + id + '/update',
      data: details
    })
      .then(response => {
        if (response.status === 204) {
          this.refs.notificationSystem.addNotification({
            message: 'Success',
            level: 'success'
            ,position:'br'
          });
          this.clearState();
        }
      })
      .catch(error => {
        this.refs.notificationSystem.addNotification({
          message: 'There was an unexpected situation, try again later',
          level: 'warning'
          ,position:'br'
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
      url: API_URL_PEOPLE + '/' + id + '/delete',
    })
      .then(response => {
        if (response.status === 200) {
          this.refs.notificationSystem.addNotification({
            message: 'Success',
            level: 'success'
            ,position:'br'
          });
          this.clearState();
        }
      })
      .catch(error => {
        this.refs.notificationSystem.addNotification({
          message: 'There was an unexpected situation, try again later',
          level: 'warning'
          ,position:'br'
        });
        console.log('Error', error);
      })
  }

  componentWillReceiveProps(nextProps) {
    // const { id } = this.state

    // if (id === 0 || id === undefined) {

    // }else
    // {
    //   this.setState({nextProps:nextProps});
    //   this.openModal();
    // }
    this.setState({
      id: nextProps.people.id,
      badgeid: nextProps.people.badgeid,
      name: nextProps.people.name,
      bvbeaconid: nextProps.people.bvbeaconid,
      iconurl: nextProps.people.iconurl,
      typeid: nextProps.people.typeid
    });
    this.forceUpdate();
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
        if (this.state.badgeid === '') {
          this.setState({ badgeidError: true })
          error = true
          return error;
        } else {
          this.setState({ badgeidError: false })
          error = false
        }

        if (this.state.name === '') {
          this.setState({ nameError: true })
          error = true
          return error;
        } else {
          this.setState({ nameError: false })
          error = false
        }

        if (this.state.bvbeaconid === '') {
          this.setState({ bvbeaconidError: true })
          error = true
          return error;
        } else {
          this.setState({ bvbeaconidError: false })
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

  openModal = () => this.setState({ confirmOpen: true })


  handleConfirm(nextProps) {
    this.setState({
      id: nextProps.people.id,
      badgeid: nextProps.people.badgeid,
      name: nextProps.people.name,
      bvbeaconid: nextProps.people.bvbeaconid,
      iconurl: nextProps.people.iconurl,
      typeid: nextProps.people.typeid
    });
    this.forceUpdate();
  }
  handleCancel() {
    this.setState({ confirmOpen: false });
  }

  render() {
    return (
      <div >
        <Fragment>
          <Grid>
            <Grid.Row>
              <Grid.Column textAlign='right'>
                <SearchComponent />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Segment raised>
            <Header as='h2'>
              <Header.Content>
                People
              </Header.Content>
            </Header>
            <Form>
              <Form.Group>
                <Form.Field width={3}>
                  <label>User id</label>
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
                  <label>Security Badge ID</label>
                  <Input
                    icon="tag"
                    placeholder="Security Badge ID"
                    required={true}
                    error={this.state.badgeidError}
                    onChange={e => this.changeValue('badgeid', e.target.value)}
                    value={this.state.badgeid}
                  />
                </Form.Field>
              </Form.Group>
              <Form.Field>
                <label>Full Name</label>
                <Input
                  icon="user"
                  placeholder="Full name"
                  required={true}
                  error={this.state.nameError}
                  onChange={e => this.changeValue('name', e.target.value)}
                  value={this.state.name}
                />
              </Form.Field>
              <Form.Field>
                <label>Bluvision Card ID</label>
                <Input
                  icon="id card"
                  placeholder="Bluvision Card ID"
                  required={true}
                  error={this.state.bvbeaconidError}
                  onChange={e => this.changeValue('bvbeaconid', e.target.value)}
                  value={this.state.bvbeaconid}
                />
              </Form.Field>
              <Form.Field hidden>
                <label>User iconurl</label>
                <Input
                  icon="image"
                  placeholder="iconurl"
                  onChange={e => this.changeValue('iconurl', e.target.value)}
                  value={this.state.iconurl}
                />
              </Form.Field>
              <Form.Field hidden>
                <label>User typeid</label>
                <Input
                  icon="browser"
                  placeholder="typeid"
                  onChange={e => this.changeValue('typeid', e.target.value)}
                  value={this.state.typeid}
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
          <NotificationSystem ref="notificationSystem" />
          {/* <Confirm open={this.state.confirmOpen} onCancel={this.handleCancel} onConfirm={this.handleConfirm} /> */}
        </Fragment >
      </div>
    );
  }
}

const mapStateToProps = (globalState) => {
  return {
    people: globalState.people
  }
}

export default connect(mapStateToProps)(People);
