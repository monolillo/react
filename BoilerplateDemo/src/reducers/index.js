import { combineReducers } from 'redux';
import skill from './skill';
import people from './people';
// import searchcomponent from './search';
import menu from './menu';

export default combineReducers({
  //searchcomponent,
  skill,
  people,
  menu
});
