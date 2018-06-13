  export default (state = []
    , action) => {
    switch (action.type) {
      case 'GET_SKILL':
        return {
          ...state
        }
      case 'SET_SKILL_FROM_SEARCH':
        return {
          ...state,
          id: action.payload.id,
          name: action.payload.name
        }
      default:
        return state
    }
  }
