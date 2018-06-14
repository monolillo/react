 export const getSearch = () => {
   return {
     type: 'GET_SEARCH',
     payload: []
   }
 }
export const setResultsFromSearch = (searchcomponent) => {
    return {
        type: 'SET_RESULTS_FROM_SEARCH',
        payload: searchcomponent
    }
}
