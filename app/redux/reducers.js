import {combineReducers} from 'redux';
import AuthReducer from './auth/reducer';
import ApplicationReducer from './application/reducer';
import UniversityReducer from './university/reducer';
import UniversityReducerHome from './university_home/reducer';
import PostReducer from './posts/reducer';
export default combineReducers({
  auth: AuthReducer,
  application: ApplicationReducer,
  university: UniversityReducer,
  universityHome: UniversityReducerHome,
  post: PostReducer,
});
