import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Input, Button, Form } from 'semantic-ui-react';
import Request from '../../api/request';
import NotificationSystem from 'react-notification-system';
import { API_URL_PEOPLE } from '../../api/URLs';

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
    };
  }
  changeValue(field, value) {
    this.setState({ [field]: value });
  }

  clearState = () => this.setState({ id: 0, badgeid: '', name: '', bvbeaconid: '', iconurl: '', typeid: '' });

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
      url: API_URL_PEOPLE + '/' + id + '/delete',
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
      id: nextProps.people.id,
      badgeid: nextProps.people.badgeid,
      name: nextProps.people.name,
      bvbeaconid: nextProps.people.bvbeaconid,
      iconurl: nextProps.people.iconurl,
      typeid: nextProps.people.typeid
    });
    this.forceUpdate();
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

  render() {

    return (
      <Fragment>
        <div className="ui two column right grid">

        </div>
        <div className="ui one column centered grid">
          <div className="column" >
            <Form>
              <Form.Field>
                <label>User id</label>
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
                <label>User Badge ID</label>
                <Input
                  icon="user"
                  placeholder="badgeid"
                  required={true}
                  error={this.state.badgeidError}
                  onChange={e => this.changeValue('badgeid', e.target.value)}
                  value={this.state.badgeid}
                />

              </Form.Field>
              <Form.Field>
                <label>User Name</label>
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
                <label>User bvbeaconid</label>
                <Input
                  icon="user"
                  placeholder="bvbeaconid"
                  required={true}
                  error={this.state.bvbeaconidError}
                  onChange={e => this.changeValue('bvbeaconid', e.target.value)}
                  value={this.state.bvbeaconid}
                />
              </Form.Field>
              <Form.Field>
                <label>User iconurl</label>
                <Input
                  icon="user"
                  placeholder="iconurl"
                  onChange={e => this.changeValue('iconurl', e.target.value)}
                  value={this.state.iconurl}
                />
              </Form.Field>
              <Form.Field>
                <label>User typeid</label>
                <Input
                  icon="user"
                  placeholder="typeid"
                  onChange={e => this.changeValue('typeid', e.target.value)}
                  value={this.state.typeid}
                />
              </Form.Field>
              <Form.Field>
                {this.state.id === 0 && <Button fluid primary onClick={this.handleCreate}>Create</Button>}
                {this.state.id !== 0 && <Button fluid primary onClick={this.handleUpdate}>Update</Button>}
                {this.state.id !== 0 && <Button fluid secondary onClick={this.handleDelete}>Delete</Button>}
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
    people: globalState.people
  }
}

export default connect(mapStateToProps)(People);
