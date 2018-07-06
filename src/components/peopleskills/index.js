import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Input, Button, Form, Dropdown, Grid, Segment,Header } from 'semantic-ui-react';
import Request from '../../api/request';
import NotificationSystem from 'react-notification-system';
import { API_URL_SKILLS, API_URL_PEOPLE } from '../../api/URLs';
import SearchComponent from '../search';

class PeopleSkill extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      name: '',
      nameError: false,
      formError: false,
      errorMessage: 'Please complete all required fields.',
      skills: [],
      mapSkills: [],
      searchQuery: '',
      loadingSkills: true,
      selectedSkills: [],
      savedSkills: []
    };
  }


  changeValue(field, value) {
    this.setState({ [field]: value });
  }

  componentWillMount() {
    this.loadSkills();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      id: nextProps.people.id,
      name: nextProps.people.name
    });
    this.forceUpdate();
    this.loadPeopleSkills(nextProps.people.id);
  }

  clearState = () => this.setState({
    id: 0, name: '', nameError: false, formError: false, mapSkills: [],
    loadingSkills: false, selectedSkills: [], savedSkills: []
  });

  loadPeopleSkills(peopleid) {
    const paramsskill = {
      url: API_URL_PEOPLE + '/' + peopleid + '/skills'
    }
    Request.get(paramsskill)
      .then(response => {
        if (response.status === 200) {
          const options = response.res.map(skill => skill.id);
          this.setState({ selectedSkills: options, savedSkills: options })
        }
      })
      .catch(error => {
        this.refs.notificationSystem.addNotification({
          message: 'There was an unexpected situation loading information, try again later',
          level: 'warning'
        });
        console.log('Error', error);
      })
  }

  loadSkills() {
    const paramsskill = {
      url: API_URL_SKILLS
    }
    Request.get(paramsskill)
      .then(response => {
        if (response.status === 200) {
          this.setState({ skills: response.res, skillsCopy: response.res, loadingSkills: false });
          const { skills } = this.state;
          const options = skills.map(({ id, name }) => ({ value: id, text: name }))
          this.setState({ skills: options })
        }
      })
      .catch(error => {
        this.refs.notificationSystem.addNotification({
          message: 'There was an unexpected situation loading information, try again later',
          level: 'warning'
        });
        console.log('Error', error);
      })
  }

  handleCreate = async () => {
    if (this.formHasErrors('CREATE')) {
      return;
    }
    const { id, selectedSkills } = this.state;
    const jsonSelectedSkills = selectedSkills.map(value => ({ 'id': value }));

    Request.post({
      url: API_URL_PEOPLE + '/' + id + '/skills',
      data: jsonSelectedSkills
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

  handleDelete = async () => {
    if (this.formHasErrors('DELETE')) {
      return;
    }
    const { id } = this.state;

    Request.post({
      url: API_URL_PEOPLE + '/' + id + '/skills',
      data: []
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

  formHasErrors(originator) {
    let error = false;
    switch (originator) {
      case 'CREATE':
      case 'UPDATE':
        if (this.state.id === 0) {
          this.setState({ nameError: true })
          error = true
          return error;
        } else {
          this.setState({ nameError: false })
          error = false
        }
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
    const { skills, loadingSkills, selectedSkills, savedSkills } = this.state;
    const renderLabel = label => ({
      color: 'blue',
      content: `${label.text}`,
      icon: 'check',
    })

    return (
      <div>
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
                People - Skills
                <Header.Subheader>Manage skills for each people</Header.Subheader>
              </Header.Content>
            </Header>
            <Form>
              <Form.Field>
                <label>People ID</label>
                <Input
                  readOnly
                  icon="id badge"
                  placeholder="Id"
                  required={true}
                  onChange={e => this.changeValue('id', e.target.value)}
                  value={this.state.id}
                />
              </Form.Field>
              <Form.Field>
                <label>People Name</label>
                <Input
                  readOnly
                  icon="user"
                  placeholder="name"
                  required={true}
                  error={this.state.nameError}
                  onChange={e => this.changeValue('name', e.target.value)}
                  value={this.state.name}
                />
              </Form.Field>
              <Form.Field>
                <label>Skill Selection</label>
                <Dropdown
                  disabled={this.state.id === 0 ? true : false}
                  multiple
                  selection
                  fluid
                  options={skills}
                  placeholder='Choose one or multiple skills'
                  renderLabel={renderLabel}
                  search
                  loading={loadingSkills}
                  onChange={(e, { value }) => this.changeValue('selectedSkills', value)}
                  value={selectedSkills}
                />
              </Form.Field>
              {this.state.id === 0 || this.state.id === undefined ? //New registry
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
                : //Existent registry
                <Grid>
                  <Grid.Row columns={2}>
                    <Grid.Column></Grid.Column>
                    <Grid.Column textAlign='right'>
                      <Form.Group>
                        <Form.Field width={6}>
                          <Button fluid primary onClick={this.handleCreate}>Update</Button>
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
        </Fragment>
      </div>
    );
  }
}

const mapStateToProps = (globalState) => {
  return {
    people: globalState.people
  }
}

export default connect(mapStateToProps)(PeopleSkill);
