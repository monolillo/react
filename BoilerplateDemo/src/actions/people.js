export const getPeople = () => {
  return {
    type: 'GET_PEOPLE',
    payload: []
  }
}

export const setPeopleFromSearch = (people) => {

  return {
    type: 'SET_PEOPLE_FROM_SEARCH',
    payload: people
  }
}
