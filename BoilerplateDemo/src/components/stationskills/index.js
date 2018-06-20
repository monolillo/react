import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Input, Button, Form,Dropdown } from 'semantic-ui-react';
import Request from '../../api/request';
import NotificationSystem from 'react-notification-system';
import { API_URL_PEOPLE } from '../../api/URLs';

class StationSkill extends Component {
    constructor() {
        super();
        this.state = {
            id: 0,
            name: '',
            nameError: false,
            formError: false,
            errorMessage: 'Please complete all required fields.',
            skills: [
                {
                    "key": "1",
                    "text": "Skill 1",
                    "value": "Skill1"
                  },
                  {
                    "key": "2",
                    "text": "Skill 2",
                    "value": "Skill2"
                  },
                  {
                    "key": "3",
                    "text": "Skill 3",
                    "value": "Skill4"
                  },
                  {
                    "key": "4",
                    "text": "Skill 4",
                    "value": "Skill4"
                  },
                  {
                    "key": "5",
                    "text": "Skill 5",
                    "value": "Skill5"
                  },
                  {
                    "key": "6",
                    "text": "Skill 6",
                    "value": "Skill6"
                  },
                  {
                    "key": "7",
                    "text": "Skill 7",
                    "value": "Skill7"
                  },
                  {
                    "key": "8",
                    "text": "Skill 8",
                    "value": "Skill8"
                  },
                  {
                    "key": "9",
                    "text": "Skill 9",
                    "value": "Skill9"
                  },
                  {
                    "key": "10",
                    "text": "Skill 10 ",
                    "value": "Skill10"
                  },
                  {
                    "key": "11",
                    "text": "Skill 11",
                    "value": "Skill11"
                  },
                  {
                    "key": "12",
                    "text": "Skill 12",
                    "value": "Skill12"
                  },{
                    "key": "13",
                    "text": "Skill 13",
                    "value": "Skill13"
                  },
                  {
                    "key": "14",
                    "text": "Skill 14",
                    "value": "Skill14"
                  },
                  {
                    "key": "15",
                    "text": "Skill 15",
                    "value": "Skill15"
                  }
                  ,{
                    "key": "16",
                    "text": "Skill 16",
                    "value": "Skill16"
                  },
                  {
                    "key": "17",
                    "text": "Skill 17",
                    "value": "Skill17"
                  },
                  {
                    "key": "18",
                    "text": "Skill 18",
                    "value": "Skill18"
                  },{
                    "key": "19",
                    "text": "Skill 19",
                    "value": "Skill19"
                  },
                  {
                    "key": "20",
                    "text": "Skill 20",
                    "value": "Skill20"
                  },
                  {
                    "key": "21",
                    "text": "Skill 21",
                    "value": "Skill 22"
                  }
            ],
            searchQuery:''
        };
    }


    changeValue(field, value) {
        this.setState({ [field]: value });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            id: nextProps.skill.id,
            name: nextProps.skill.name
        });
        this.forceUpdate();
    }

    clearState = () => this.setState({ id: 0, name: '' });




    render() {
        const { skills,searchQuery } = this.state;
        const renderLabel = label => ({
            color: 'blue',
            content: `Customized label - ${label.text}`,
            icon: 'check',
          })
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
                                <label>Skill Selection</label>
                                <Dropdown
                                    multiple
                                    selection
                                    fluid
                                    options={skills}
                                    placeholder='Choose one or multiple skills'
                                    renderLabel={renderLabel}
                                    search
                                />
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

export default connect(mapStateToProps)(StationSkill);
