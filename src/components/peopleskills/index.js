import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Input, Button, Form, Dropdown } from 'semantic-ui-react';
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
          this.setState({ selectedSkills: options,savedSkills:options })
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
      <Fragment>
        <div className="ui one column centered grid">
          <div className="column" >
            <Form.Field>
              {/* <label>Search</label>
              <SearchComponent /> */}
            </Form.Field>
            <Form>
              <Form.Field>
                <label>People ID</label>
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
                <label>People Name</label>
                <Input
                  disabled
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
              <Form.Field>
                {savedSkills.length === 0 && <Button fluid primary onClick={this.handleCreate}>Create</Button>}
                {savedSkills.length !== 0 && <Button fluid secondary onClick={this.handleCreate}>Update</Button>}
                {savedSkills.length !== 0 && <Button fluid danger onClick={this.handleDelete}>Delete</Button>}
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

export default connect(mapStateToProps)(PeopleSkill);
