export default (state = {
    active: 'home',
  }, action) => {
    switch (action.type) {
      case 'CHANGE_ACTIVE_MOBILE_ITEM':
        return {
          ...state,
          active: action.payload
        }
      default:
        return state
    }
  }
  