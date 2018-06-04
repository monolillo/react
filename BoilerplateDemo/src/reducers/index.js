import { combineReducers } from 'redux';
import clients from './clients';
import menu from './menu';

export default combineReducers({
  clients,
  menu
});
