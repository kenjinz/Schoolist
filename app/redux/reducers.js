import {combineReducers} from 'redux';
import AuthReducer from './auth/reducer';
import ApplicationReducer from './application/reducer';

export default combineReducers({
  auth: AuthReducer,
  application: ApplicationReducer,
});
