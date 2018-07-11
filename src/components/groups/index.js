import React, { Component, Fragment } from 'react';
import { Input, Button, Form, Grid, Segment, Header, Confirm } from 'semantic-ui-react';
import SearchComponent from '../search';
import { connect } from 'react-redux'

class Groups extends Component {

    constructor() {
        super();
    
        this.state = {
            id: 0,
            name: '',
            nextProps: []
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
    }
    
    componentWillUnmount() {
        this.clearState();
    }

    render() {
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
                            <Header.Content> Groups </Header.Content>
                        </Header>
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
                        </Form>
                    </Segment>
                </Fragment>
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