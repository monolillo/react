import React, { Component } from 'react';
import { Table, Loader, Segment, Dimmer, Icon, Card, Image, Divider, Modal, Button, Header } from 'semantic-ui-react';
import Request from '../../api/request';
import { API_URL_STATION } from '../../api/URLs';
import BrandLogo from '../../assets/eluxlogo.png';
import NeorisList from '../neoriscomponents/neorislist';
class PlayGround extends Component {

    constructor() {
        super();
        this.state = {
            searchResults: [],
            results: [],
            active: true
        };
    }
    changeValue(field, value) {
        this.setState({ [field]: value });
    }

    clearState = () => this.setState({ id: 0, name: '', bvblufiid: 0 });
    //resetComponent = () => this.setState({ searchResults: [] })

    loadSearchData() {
        //this.resetComponent();

        const paramsstation = {
            url: API_URL_STATION
        }
        Request.get(paramsstation)
            .then(response => {
                if (response.status === 200) {
                    this.setState({ searchResults: response.res, results: response.res, active: false });
                }
            })
            .catch(error => {
                this.setState({ active: false });
            })
    }

    componentWillMount() {
        this.loadSearchData();
    }

    handleRowClick = (result) => { alert(result.name); }

    render() {
        return (
            <div>
               
                <h1>Welcome to the PlayGround</h1>
                <Dimmer active={this.state.active}>
                    <Loader />
                </Dimmer>
                <Segment>
                    <Modal trigger={<Button>Show Modal</Button>}>
                        <Modal.Header>Select a Photo</Modal.Header>
                        <Modal.Content image>
                            <Image wrapped='medium' src={BrandLogo} />
                            <Modal.Description>
                                <Header>Default Profile Image</Header>
                                <p>We've found the following gravatar image associated with your e-mail address.</p>
                                <p>Is it okay to use this photo?</p>
                            </Modal.Description>
                        </Modal.Content>
                    </Modal>

                    <Divider>This one is a divider for basic table example</Divider>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>ID</Table.HeaderCell>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {this.state.searchResults.map(result => <Table.Row key={result.id} onClick={this.handleRowClick.bind(this, result)}>
                                <Table.Cell
                                    children={result.id}>
                                </Table.Cell>
                                <Table.Cell
                                    children={result.name}>
                                </Table.Cell>
                            </Table.Row>)}
                        </Table.Body>
                    </Table>
                </Segment>
                <Divider>This one is a divider for Cards example</Divider>
                <Segment>
                    {this.state.searchResults.map(result =>
                        <Card key={result.id} onClick={this.handleRowClick.bind(this, result)}>
                            <Image src={BrandLogo} />
                            <Card.Content>
                                <Card.Header>{result.name}</Card.Header>
                                <Card.Meta>
                                    <span className='date'>{result.bvblufiid}</span>
                                </Card.Meta>
                                <Card.Description>This text is composed: {result.id + ' ' + result.name + ' ' + result.bvblufiid}</Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <a>
                                    <Icon name='user' />
                                    This is plain text
                                </a>
                            </Card.Content>
                        </Card>
                    )}
                </Segment>
                <Segment>

                </Segment>
                <Segment>
                    <NeorisList infolist={this.state.searchResults} />
                </Segment>
            </div>
        );
    }
}

export default PlayGround;
