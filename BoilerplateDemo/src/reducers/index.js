import { combineReducers } from 'redux';
import people from './people';
import menu from './menu';

export default combineReducers({
  people,
  menu
});
