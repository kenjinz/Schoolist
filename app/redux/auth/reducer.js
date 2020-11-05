import AsyncStorage from '@react-native-community/async-storage';

import {authActionTypes} from './actions';
const _INITIAL_STATE_ = {
  isAuthenticated: false,
  data: {
    // id: AsyncStorage.getItem('id'),
    // name: AsyncStorage.getItem('name'),
    // email: AsyncStorage.getItem('email'),
    id: '',
    name: '',
    email: '',
  },
  role: '',
  isLoading: false,
  loginError: false,
  loginSuccess: false,
};
export default function (state = _INITIAL_STATE_, action) {
  switch (action.type) {
    case authActionTypes.LOGIN_ATTEMPT:
      return {
        ...state,
        isLoading: true,
      };
    case authActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        data: action.data,
        role: action.data.role.name,
        isLoading: true,
        loginSuccess: true,
        loginError: false,
      };
    case authActionTypes.LOGIN_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        loginSuccess: false,
        loginError: action.loginError,
      };
    case authActionTypes.LOGOUT:
      return {
        ...state,
        data: {},
        isAuthenticated: false,
      };
    default:
      return state;
  }
}
