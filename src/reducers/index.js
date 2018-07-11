import { combineReducers } from 'redux';
import skill from './skill';
import station from './station';
import people from './people';
// import searchcomponent from './search';
import menu from './menu';
import menumobile from './menu';
import groups from './groups'

export default combineReducers({
  //searchcomponent,
  station,
  skill,
  people,
  menu,
  menumobile,
  groups
});
