import {combineReducers} from 'redux';
import AuthReducer from './auth/reducer';
import ApplicationReducer from './application/reducer';
import UniversityReducer from './university/reducer';
export default combineReducers({
  auth: AuthReducer,
  application: ApplicationReducer,
  university: UniversityReducer,
});
