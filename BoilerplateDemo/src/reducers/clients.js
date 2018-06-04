export default (state = {
  address: '',
  cards: ''
}, action) => {
  switch (action.type) {
    case 'GET_CLIENTS':
      return {
        ...state
      }
    default:
      return state
  }
}
