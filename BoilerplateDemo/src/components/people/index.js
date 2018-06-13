import _ from 'lodash';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Input, Button, Form, Search, Grid, Header, Label } from 'semantic-ui-react';
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
      typeid: ''
    };
  }
  changeValue(field, value) {
    this.setState({ [field]: value });
  }

  clearState = () => this.setState({ id: 0, badgeid: '', name: '', bvbeaconid: '', iconurl: '', typeid: '' });

  handleCreate = async () => {
    const { history } = this.props;
    const { badgeid, name, bvbeaconid } = this.state;

    const details = {
      badgeid: badgeid,
      name: name,
      bvbeaconid: bvbeaconid
    }

    const formBody = await this.setFormBody(details);

    Request.post({
      url: API_URL_PEOPLE + '/new',
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
    const { id, badgeid, name, bvbeaconid } = this.state;

    const details = {
      badgeid: badgeid,
      name: name,
      bvbeaconid: bvbeaconid
    }

    const formBody = await this.setFormBody(details);

    Request.put({
      url: API_URL_PEOPLE + '/' + id + '/update',
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
      url: API_URL_PEOPLE + '/' + id + '/delete',
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

    /*
  componentWillReceiveProps() {
    console.log('componentWillReceiveProps');
  }
  

   componentDidUpdate(nextProps){
    
    this.setState({ 
      id: this.props.people.id,
      badgeid: this.props.people.badgeid,
      name: this.props.people.name,
      bvbeaconid: this.props.people.bvbeaconid, 
      iconurl: this.props.people.iconurl ,
      typeid: this.props.people.typeid });
      this.forceUpdate();
  }

  
  */

 componentWillReceiveProps(nextProps) {
  console.log('componentWillReceiveProps');
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

  render() {
    
    return (
      <Fragment>
        <div className="ui two column right grid">

        </div>
        <div className="ui one column centered grid">
          <div className="column" >
            <Form>
              <Form.Field>
                <Input label='User id'
                  icon="user"
                  placeholder="Id"
                  onChange={e => this.changeValue('id', e.target.value)}
                  value={this.state.id}
                />
              </Form.Field>
              <Form.Field>
                <Input
                  label='User Badge ID'
                  icon="user"
                  placeholder="badgeid"
                  onChange={e => this.changeValue('badgeid', e.target.value)}
                  value={this.state.badgeid}
                />

              </Form.Field>
              <Form.Field>
                <Input
                  label='User Name'
                  icon="user"
                  placeholder="name"
                  onChange={e => this.changeValue('name', e.target.value)}
                  value={this.state.name}
                />
              </Form.Field>
              <Form.Field>
                <Input
                  label='User bvbeaconid'
                  icon="user"
                  placeholder="bvbeaconid"
                  onChange={e => this.changeValue('bvbeaconid', e.target.value)}
                  value={this.state.bvbeaconid}
                />
              </Form.Field>
              <Form.Field>
                <Input
                  label='User iconurl'
                  icon="user"
                  placeholder="iconurl"
                  onChange={e => this.changeValue('iconurl', e.target.value)}
                  value={this.state.iconurl}
                />
              </Form.Field>
              <Form.Field>
                <Input
                  label=' User typeid'
                  icon="user"
                  placeholder="typeid"
                  onChange={e => this.changeValue('typeid', e.target.value)}
                  value={this.state.typeid}
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
    people: globalState.people
  }
}

export default connect(mapStateToProps)(People);
