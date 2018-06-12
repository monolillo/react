import _ from 'lodash'
import React, { Component } from 'react'
import {connect} from 'react-redux'
import { PropTypes } from 'prop-types';
import { Search, Grid, Header } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';
import { API_URL_PEOPLE } from '../../api/URLs';
import Request from '../../api/request';
import * as peopleActions from '../../actions/people';


class SearchComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      searchValue: '',
      searchIsLoading: false,
      searchResults: [],
      searchClickResult: []
    };
  }


  componentWillMount() {
    // this.resetComponent();
  }

  resetComponent = () => this.setState({ searchIsLoading: false, searchResults: [], searchValue: '' })

  loadSearchData(actualcomponent) {
    this.resetComponent();
    this.setState({ searchIsLoading: true });
    switch (actualcomponent) {
      case '/':
        break
      case '/people':
        const params = {
          url: API_URL_PEOPLE
        }
        Request.get(params)
          .then(response => {
            if (response.status === 200) {
              if (localStorage.getItem("lookUpAllPeople") !== undefined) {
                localStorage.removeItem("lookUpAllPeople");
              }
              //localStorage.setItem("lookUpAllPeople", JSON.stringify(response.res));
              this.setState({ searchResults: response.res })
              this.setState({ searchIsLoading: false });
            }
          })
          .catch(error => {
            this.refs.notificationSystem.addNotification({
              message: 'Invalid user, check your data and try again',
              level: 'warning'
            });
            console.log('Error', error);
          })
        break
      default:
        this.resetComponent();
        break;
    }

  }

  handleResultSelect = (e, { result }) => {
    //this.setState({ searchValue: result.name, searchClickResult: result })
    this.props.setPeopleFromSearch(result)
  }

  handleClick = (e) => {
    const { history } = this.props;
    this.loadSearchData(history.location.pathname);
  };
  render() {
    //const { searchIsLoading,searchResults,searchValue } = this.props
    // const { isLoading, value } = this.state

    return (
      <Grid>
        <Grid.Column width={8}>
          <Search on
            loading={this.state.searchIsLoading}
            onFocus={this.handleClick}
            results={this.state.searchResults}
            resultRenderer={
              ({ id, name }) => [
                <div key='id' className='content'>
                  {id && <div className='price'>{id}</div>}
                  {name && <div className='title'>{name}</div>}
                </div>,
              ]
            }
            value={this.state.searchValue}
            onResultSelect={this.handleResultSelect}
          // onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
          // {...this.props}
          />
        </Grid.Column>
        {/* <Grid.Column width={8}>
              <Header>State</Header>
              <pre>{JSON.stringify(this.state, null, 2)}</pre>
              <Header>Options</Header>
              <pre>{JSON.stringify(source, null, 2)}</pre>
            </Grid.Column> */}
      </Grid>
    )
  }
}

//export default connect() withRouter(SearchComponent);
export default connect(null,peopleActions)(withRouter(SearchComponent));