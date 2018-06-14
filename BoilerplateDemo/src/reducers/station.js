export default (state = []
    , action) => {
    switch (action.type) {
      case 'GET_STATION':
        return {
          ...state
        }
      case 'SET_STATION_FROM_SEARCH':
      console.log(action.payload);
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
