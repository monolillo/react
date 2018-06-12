export default (state = []
  , action) => {
  switch (action.type) {
    case 'GET_PEOPLE':
      return {
        ...state
      }
    case 'SET_PEOPLE_FROM_SEARCH':
   
      return {
        ...state,
        id:action.payload.id,
        badgeid: action.payload.badgeid,
        name:action.payload.name,
        bvbeaconid: action.payload.bvbeaconid,
        iconurl: action.payload.iconurl,
        typeid: action.payload.typeid
        //people:action.payload 
        // people: action.payload,
        // peopleState: action.payload
      }
    default:
      return state
  }
}
