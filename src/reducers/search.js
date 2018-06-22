export default (state = []
    , action) => {
    switch (action.type) {
        case 'SET_RESULTS_FROM_SEARCH':
            return {
                ...state,
                id: action.payload.id//===undefined?-1:action.payload.id
                // ,badgeid: action.payload.badgeid,
                , name: action.payload.name,
                // bvbeaconid: action.payload.bvbeaconid,
                // iconurl: action.payload.iconurl,
                // typeid: action.payload.typeid
            }
        default:
            return state
    }
}

