export default (state = []
  , action) => {
  switch (action.type) {
    case 'GET_STATION':
      return {
        ...state
      }
    case 'SET_STATION_FROM_SEARCH':
      return {
        ...state,
        id: action.payload.id,
        name: action.payload.name,
        bvblufiid: action.payload.bvblufiid
      }
    default:
      return state
  }
}
