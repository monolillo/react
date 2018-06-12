import _ from 'lodash';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Input, Button, Form, Search, Grid, Header } from 'semantic-ui-react';
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

  handleCreate = async () => {
    const { history } = this.props;
    const { badgeid,name,bvbeaconid } = this.state;

    const details = {
        badgeid: badgeid,
        name: name,
        bvbeaconid:bvbeaconid
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
    const {id, badgeid,name,bvbeaconid } = this.state;

    const details = {
        badgeid: badgeid,
        name: name,
        bvbeaconid:bvbeaconid
    }

    const formBody = await this.setFormBody(details);

    Request.put({
      url: API_URL_PEOPLE + '/' + id +'/update',
      data: details
    })
      .then(response => {
        if (response.status === 204) {
          this.refs.notificationSystem.addNotification({
            message: 'funciono',
            level: 'success'
          });
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
    const {id} = this.state;

    Request.delete({
      url: API_URL_PEOPLE + '/' + id +'/delete',
    })
      .then(response => {
        if (response.status === 200) {
          this.refs.notificationSystem.addNotification({
            message: 'funciono',
            level: 'success'
          });
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

  componentWillReceiveProps() {
    //console.log('componentWillReceiveProps', this.props);
    this.setState({ id: this.props.people.id });
    this.setState({ badgeid: this.props.people.badgeid });
    this.setState({ name: this.props.people.name });
    this.setState({ bvbeaconid: this.props.people.bvbeaconid });
    this.setState({ iconurl: this.props.people.iconurl });
    this.setState({ typeid: this.props.people.typeid });
  }

  /*
  
 
   componentDidMount() {
     this.loadSearchData();
   }
 
 
   handleSearchChange = (e, { value }) => {
     this.setState({ isLoading: true, value })
 
     setTimeout(() => {
       if (this.state.value.length < 1) return this.resetComponent()
       const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
       const isMatch = result => re.test(result.title)
       this.setState({
         isLoading: false,
         results: _.filter(this.state.results, isMatch),
       })
     }, 300)
   }
 
   loadSearchData = async () => {
     const params = {
       url: API_URL_PEOPLE
     }
     Request.get(params)
       .then(response => {
         if (response.status === 200) {
           if (localStorage.getItem("lookUpAllPeople") != undefined) {
             localStorage.removeItem("lookUpAllPeople");
           }
           localStorage.setItem("lookUpAllPeople", JSON.stringify(response.res));
           this.setState({ results: response.res })
           console.log(this.state.results);
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
 */
  componentDidUpdate() {
    //this.setState({people:this.props.people});
    //console.log('update',this.state);
  }

  componentWillMount() {
    /*
    if (this.props.people.people === undefined) {
      this.props.people.people = {
        id: '',
        badgeid: '',
        name: '',
        bvbeaconid: '',
        iconurl: '',
        typeid: ''
      }
    }
    */

  }



  render() {

    //const {peopleState} = this.state
    //console.log('propscomponent',this.props);
    //const {people}= this.state;

    console.log('render', this.state)


    return (
      <Fragment>
        <div className="ui two column right grid">

        </div>
        <div className="ui one column centered grid">
          <div className="column" >
            <Form>
              <Form.Field>
                <Input
                  icon="user"
                  placeholder="Id"
                  onChange={e => this.changeValue('id', e.target.value)}
                  value={this.state.id}
                />
              </Form.Field>

              <Form.Field>
                <Input
                  icon="user"
                  placeholder="badgeid"
                  onChange={e => this.changeValue('badgeid', e.target.value)}
                  value={this.state.badgeid}
                />

              </Form.Field>

              <Form.Field>
                <Input
                  icon="user"
                  placeholder="name"
                  onChange={e => this.changeValue('name', e.target.value)}
                  value={this.state.name}
                />
              </Form.Field>

              <Form.Field>
                <Input
                  icon="user"
                  placeholder="bvbeaconid"
                  onChange={e => this.changeValue('bvbeaconid', e.target.value)}
                  value={this.state.bvbeaconid}
                />
              </Form.Field>

              <Form.Field>
                <Input
                  icon="user"
                  placeholder="iconurl"
                  onChange={e => this.changeValue('iconurl', e.target.value)}
                  value={this.state.iconurl}
                />
              </Form.Field>

              <Form.Field>
                <Input
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
  console.log('mapStateToProps-globalstate', globalState);
  //console.log('mapStateToProps-state',People.state);

  return {
    //id:state.people.id
    people: globalState.people
  }
}

export default connect(mapStateToProps)(People);
//export default People;
