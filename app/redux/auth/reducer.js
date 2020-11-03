// import {AuthenticationTypes} from './actions';
// import {makeReducerCreator} from '@utils';
import AsyncStorage from '@react-native-community/async-storage';
// const initialState = {
//   isAuthenticated: !!AsyncStorage.getItem('sessionToken'), // FIx later
//   data: {
//     id: AsyncStorage.getItem('id'),
//     name: AsyncStorage.getItem('name'),
//     email: AsyncStorage.getItem('email'),
//   },
//   role: '',
//   isLoading: false,
//   loginError: false,
//   loginSuccess: false,
// };
// const loginSuccess = (state, {response}) => {
//   const {data} = state;
//   data.name = response.name;
//   data.id = id; // ??
//   data.email = response.email;
//   return {
//     ...state,
//     data,
//     role: response.role.name,
//     isLoading: false,
//     isAuthenticated: true,
//     loginError: false,
//     loginSuccess: true,
//   };
// };
// const loginFail = (state, {error}) => ({
//   ...state,
//   isShowLoading: false,
//   isAuthenticated: false,
//   loginError: error,
//   loginSuccess: false,
// });
// const loginIsLoading = (status) => ({
//   isLoading: status,
//   loginError: null,
// });
// export const authentication = makeReducerCreator(initialState, {
//   [AuthenticationTypes.LOGIN_SUCCESS]: loginSuccess,
//   [AuthenticationTypes.LOGIN_FAIL]: loginFail,
// });
import {authActionTypes} from './actions';
const _INITIAL_STATE_ = {
  //isAuthenticated: !!AsyncStorage.getItem('token'), // FIx later
  isAuthenticated: false,
  data: {
    id: AsyncStorage.getItem('id'),
    name: AsyncStorage.getItem('name'),
    email: AsyncStorage.getItem('email'),
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
