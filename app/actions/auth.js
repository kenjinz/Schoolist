import * as actionTypes from './actionTypes';
import {Alert} from 'react-native';
// const onLogin = (data) => {
//   return {
//     type: actionTypes.LOGIN,
//     data,
//   };
// };

// export const authentication = (login, callback) => (dispatch) => {
//   //call api and dispatch action case
//   setTimeout(() => {
//     let data = {
//       success: login,
//     };
//     dispatch(onLogin(data));
//     if (typeof callback === 'function') {
//       callback({success: true});
//     }
//   }, 500);
// };
const LoginUrl = 'https://api.schoolist.org/auth/login';

const setLoginState = (loginData) => {
  return {
    type: actionTypes.LOGIN,
    payload: loginData,
  };
};
export const login = (loginInput) => {
  const {email, password} = loginInput;
  console.log(loginInput);
  return (dispatch) => {
    // don't forget to use dispatch here!
    return fetch(LoginUrl, {
      method: 'POST',
      headers: {
        // these could be different for your API call
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginInput),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json.msg === 'success') {
          // response success checking logic could differ
          dispatch(setLoginState({...json, userId: username})); // our action is called here
        } else {
          Alert.alert('Login Failed', 'Username or Password is incorrect');
        }
      })
      .catch((err) => {
        Alert.alert('Login Failed', 'Some error occured, please retry');
        console.log(err);
      });
  };
};
