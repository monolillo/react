 export const getSearch = () => {
   return {
     type: 'GET_SEARCH',
     payload: []
   }
 }
export const setResultsFromSearch = (searchcomponent) => {
    console.log('setResultsFromSearch',searchcomponent)
    return {
        type: 'SET_RESULTS_FROM_SEARCH',
        payload: searchcomponent
    }
}
