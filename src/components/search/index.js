import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Search, Grid, Header } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';
import { API_URL_PEOPLE, API_URL_SKILLS, API_URL_STATION } from '../../api/URLs';
import Request from '../../api/request';
import NotificationSystem from 'react-notification-system';

import * as peopleActions from '../../actions/people';
import * as skillActions from '../../actions/skill';
import * as stationActions from '../../actions/station';


class SearchComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      searchValue: '',
      searchIsLoading: false,
      searchResults: [],
      searchClickResult: [],
      results: []
    };
  }


  componentWillMount() {
    this.resetComponent();
  }

  resetComponent = () => this.setState({ searchIsLoading: false, searchResults: [], searchValue: '' })

  loadSearchData(actualcomponent) {
    this.resetComponent();
    this.setState({ searchIsLoading: true });
    switch (actualcomponent) {
      case '/':
        break;
      case '/people':
      case '/peopleskill':
        const params = {
          url: API_URL_PEOPLE
        }
        Request.get(params)
          .then(response => {
            if (response.status === 200) {
              this.setState({ searchResults: response.res, searchIsLoading: false, results: response.res });
            }
          })
          .catch(error => {
            this.refs.notificationSystem.addNotification({
              message: 'There was an unexpected situation loading information, try again later',
              level: 'warning'
            });
            console.log('Error', error);
          })
        break;
      case '/skill':
        const paramsskill = {
          url: API_URL_SKILLS
        }
        Request.get(paramsskill)
          .then(response => {
            if (response.status === 200) {
              this.setState({ searchResults: response.res, searchIsLoading: false, results: response.res });
            }
          })
          .catch(error => {
            this.refs.notificationSystem.addNotification({
              message: 'There was an unexpected situation loading information, try again later',
              level: 'warning'
            });
            console.log('Error', error);
          })
        break;
      case '/station':
      case '/stationskill':
        const paramsstation = {
          url: API_URL_STATION
        }
        Request.get(paramsstation)
          .then(response => {
            if (response.status === 200) {
              this.setState({ searchResults: response.res, searchIsLoading: false, results: response.res });
            }
          })
          .catch(error => {
            this.refs.notificationSystem.addNotification({
              message: 'There was an unexpected situation loading information, try again later',
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

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (value < 1) return this.setState({ results: this.state.searchResults });

      const re = new RegExp(_.escapeRegExp(value), 'i')
      const isMatch = result => re.test(result.name)

      this.setState({
        isLoading: false,
        results: _.filter(this.state.results, isMatch),
      })
    }, 300)
  }

  handleResultSelect = (e, { result }) => {
    const { history } = this.props;
    this.setState({ searchValue: '' })
    switch (history.location.pathname) {
      case '/people':
      case '/peopleskill':
        this.props.setPeopleFromSearch(result)
        break;
      case '/skill':
        this.props.setSkillFromSearch(result)
        break;
      case '/station':
      case '/stationskill':
        this.props.setStationFromSearch(result)
        break;
      default:
        break;
    }

  }

  handleClick = (e) => {
    const { history } = this.props;
    this.loadSearchData(history.location.pathname);
  };
  render() {
    const { isLoading, value, results } = this.state
    return (
      <div>
        <Search on
          loading={this.state.searchIsLoading}
          onFocus={this.handleClick}
          results={this.state.results}
          resultRenderer={
            ({ id, name, badgeid, bvblufiid }) => [
              <div key='id' className='content'>
                {badgeid && <div className='price'>{id}</div>}
                {name && <div className='title'>{name}</div>}
              </div>,
            ]
          }
          title=''
          onResultSelect={this.handleResultSelect}
          onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
          {...this.props}
        />
        <NotificationSystem ref="notificationSystem" />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setPeopleFromSearch: (people) => dispatch({ type: 'SET_PEOPLE_FROM_SEARCH', payload: people }),
    setSkillFromSearch: (skill) => dispatch({ type: 'SET_SKILL_FROM_SEARCH', payload: skill }),
    setStationFromSearch: (station) => dispatch({ type: 'SET_STATION_FROM_SEARCH', payload: station }),
  }
}

function mapStateToProps(state) {
  return {
    people: state.people,
    skill: state.skill,
    station: state.station
  }
}


//export default connect() withRouter(SearchComponent);
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchComponent));
