
export const getStation = () => {
    return {
        type: 'GET_STATION',
        payload: []
    }
  }
  export const setStationFromSearch = (station) => {
      console.log(station);
    return {
        type: 'SET_STATION_FROM_SEARCH',
        payload: station
    }
  }
  