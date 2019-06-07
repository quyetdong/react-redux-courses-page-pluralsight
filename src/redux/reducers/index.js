import { combineReducers } from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';
import apiCallsInprogress from './apiStatusReducer';

const rootReducer = combineReducers({
  courses,
  authors,
  apiCallsInprogress
});

export default rootReducer;
