import AsyncStorage from '@react-native-community/async-storage';
import Config from 'react-native-config';
export const authActionTypes = {
  LOGIN_ATTEMPT: 'LOGIN_ATTEMPT',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAIL: 'LOGIN_FAIL',
  LOGOUT: 'LOGOUT',
};
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

    return fetch(`${Config.API_URL}/auth/login`, {
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
        const res = json;
        if (res.token) {
          // response success checking logic could differ

          dispatch(LoginSuccess(res)); // our action is called here
        } else {
          dispatch(LoginFailure(res));
        }
      })
      .catch((err) => {
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
