// import {makeConstantCreator, makeActionCreator} from '@utils';
import AsyncStorage from '@react-native-community/async-storage';
// export const AuthenticationTypes = makeConstantCreator(
//   'LOGIN',
//   'LOGIN_SUCCESS',
//   'LOGIN_FAIL',
// );
// export const loginSuccessAction = (response) =>
//   makeActionCreator(AuthenticationTypes.LOGIN_SUCCESS, {response});
// export const loginFailureAction = (response) =>
//   makeActionCreator(AuthenticationTypes.LOGIN_FAIL, {error});

// export function LoginAction(userValues) {
//   return (dispatch) => {
//     // don't forget to use dispatch here!
//     return fetch('https://api.schoolist.org/auth/login', {
//       method: 'POST',
//       headers: {
//         // these could be different for your API call
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(userValues),
//     })
//       .then((response) => response.json())
//       .then((json) => {
//         console.log('JSON', json);
//         const res = json;
//         if (res.token) {
//           // response success checking logic could differ
//           console.log('SUCCESSFULLY');
//           AsyncStorage.setItem('id', res.id);
//           AsyncStorage.setItem('name', res.name);
//           AsyncStorage.setItem('email', res.email);
//           AsyncStorage.setItem('role', res.role.name);
//           dispatch(loginSuccessAction(json)); // our action is called here
//         } else {
//           console.log('FAIL');
//           dispatch(loginFailureAction(json));
//           //Alert.alert('Login Failed', 'Username or Password is incorrect');
//         }
//       })
//       .catch((err) => {
//         //Alert.alert('Login Failed', 'Some error occured, please retry');
//         console.log('ABC', err);
//         dispatch(loginFailureAction(err));
//       });
//   };
// }
export const authActionTypes = {
  LOGIN_ATTEMPT: 'LOGIN_ATTEMPT',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAIL: 'LOGIN_FAIL',
  LOGOUT: 'LOGOUT',
};
const URL = 'https://api.schoolist.org/auth/login';
export function LoginLoading() {
  return {
    type: authActionTypes.LOGIN_ATTEMPT,
  };
}
export function LoginSuccess(data) {
  return {
    type: authActionTypes.LOGIN_SUCCESS,
    data,
  };
}
export function LoginFailure(loginError) {
  return {
    type: authActionTypes.LOGIN_FAIL,
    loginError,
  };
}
export function LogoutSuccess() {
  return {
    type: authActionTypes.LOGOUT,
  };
}
export function Login(userValues) {
  return (dispatch) => {
    dispatch(LoginLoading());
    console.log('REQUEST API ');
    return fetch(URL, {
      method: 'POST',
      headers: {
        // these could be different for your API call
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userValues),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log('JSON', json);
        const res = json;
        if (res.token) {
          // response success checking logic could differ
          console.log('SUCCESSFULLY');
          dispatch(LoginSuccess(res)); // our action is called here
        } else {
          console.log('FAIL');
          dispatch(LoginFailure(res));
        }
      })
      .catch((err) => {
        console.log('ABC', err);
        dispatch(LoginFailure(err));
      });
  };
}
export function Logout() {
  return (dispatch) => {
    AsyncStorage.removeItem('persist:root');
    dispatch(LogoutSuccess());
    return;
  };
}