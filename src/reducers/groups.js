export default (state = []
    , action) => {
    switch (action.type) {
      case 'SET_GROUPS_FROM_SEARCH':
        return {
          ...state,
          id: action.payload.id,
          name: action.payload.name,
          selectedAuthorities: action.payload.authoritiesList,
        }
      default:
        return state
    }
  }