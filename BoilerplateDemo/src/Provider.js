import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Reducers from './reducers';
import RoutesApp from './routes';

class App extends Component {
  render() {
    return (
      <Provider store={createStore(Reducers)}>
        <RoutesApp />
      </Provider>
    );
  }
}

export default App;
