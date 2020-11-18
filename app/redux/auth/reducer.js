import AsyncStorage from '@react-native-community/async-storage';

import {authActionTypes} from './actions';
const _INITIAL_STATE_ = {
  isAuthenticated: false,
  data: {
    //token: '',
    fullName: '',
    id: 0,
    name: '',
    profile: {
      id: 0,
      phoneNumber: '',
      gender: false,
      age: 0,
    },
    email: '',
    role: {
      id: 0,
      name: '',
      acessLevel: 0,
    },
  },
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
        isLoading: false,
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
        loginError: false,
        loginSuccess: false,
      };
    default:
      return state;
  }
}
